import axios from 'axios'
import { ethers } from 'ethers'
import FormData from 'form-data'
import fs from 'fs'
import { Db, ObjectId } from 'mongodb'
import { ProjectModel, TokenModel } from './models'
import { ViewObject, ViewFunc } from './types'
import * as Views from './views'

const p5 = require('./node-p5')
const MIN_GAS = 90
const MAX_GAS = 120
let lastGasPrice = '300'

const sleep = async (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time))

async function getGasPrice() {
  do {
    const result = (
      await axios.get(
        `https://api.etherscan.io/api?module=gastracker&action=gasoracle&apikey=${process.env.ETHERSCAN_KEY}`
      )
    ).data.result.FastGasPrice // ProposeGasPrice
    if (result) {
      lastGasPrice = result
    }
    const gasPrice = parseInt(lastGasPrice)
    if (gasPrice > MAX_GAS) {
      console.warn('Gas too high', lastGasPrice, '>', MAX_GAS)
      await sleep(6000)
    }
    if (gasPrice < MIN_GAS) {
      lastGasPrice = MIN_GAS.toString()
    }
  } while (parseInt(lastGasPrice) > MAX_GAS)
  return lastGasPrice
}

export const nodeP5Controller = async (
  contract: ethers.Contract,
  db: Db,
  id: ObjectId
) => {
  console.log('Creating nodeP5Controller')
  return async (event: any) => {
    const doc = (await db
      .collection('projects')
      .findOne({ _id: id })) as ProjectModel
    if (doc && Views.hasOwnProperty(doc.view)) {
      const tokenId = parseInt(event.args['tokenId_'])
      const projectTokenId = parseInt(event.args['projectTokenId_'])
      if (!doc.tokens || !doc.tokens.hasOwnProperty(tokenId)) {
        console.log(
          'generating',
          doc.view,
          doc.projectId,
          projectTokenId,
          tokenId
        )
        try {
          // Do the generative thing
          const viewFunc: ViewFunc = (Views as any)[doc.view]
          const viewObj: ViewObject = viewFunc(
            doc.projectId,
            projectTokenId,
            tokenId,
            event
          )
          let instance = p5.createSketch(viewObj.sketch)
          console.log(
            'saving',
            doc.view,
            doc.projectId,
            projectTokenId,
            tokenId
          )
          // Save frames
          await instance.saveFrames(
            viewObj.data.canvas,
            `${tokenId}`, // always save gif
            viewObj.data.appendGif || !viewObj.data.isPng ? { repeat: viewObj.data.repeat, quality: viewObj.data.quality } : 'png',
            viewObj.data.duration,
            viewObj.data.frameRate
          )
          console.log(
            'saved',
            doc.view,
            doc.projectId,
            projectTokenId,
            tokenId
          )
          // memory leak whyyyyyyy
          p5.cleanup()

          let ipfsGif
          let ipfsPng

          if (viewObj.data.appendGif || !viewObj.data.isPng) {
            // Upload gif to IPFS
            const file = fs.createReadStream(`${tokenId}/${tokenId}.gif`)
            const imgData = new FormData()
            imgData.append(
              'file',
              file,
              `${doc.network}_${doc.projectId}_${projectTokenId}_${tokenId}.gif`
            )
            ipfsGif = await axios.post(
              'https://api.pinata.cloud/pinning/pinFileToIPFS',
              imgData,
              {
                maxBodyLength: Infinity,
                headers: {
                  Authorization: `Bearer ${process.env.JWT}`,
                  'Content-Type': `multipart/form-data; boundary=${imgData.getBoundary()}`,
                },
              }
            )

            if (!ipfsGif || !ipfsGif.data || !ipfsGif.data.IpfsHash) {
              throw new Error('gif creation failed')
            }
          }

          if (viewObj.data.isPng) {
            // Upload png to IPFS
            const file = fs.createReadStream(
              `${tokenId}/${viewObj.data.appendGif ? 'frame-' : ''}${
                viewObj.data.frameRate * viewObj.data.duration - 1
              }.png`
            )
            const imgData = new FormData()
            imgData.append(
              'file',
              file,
              `${doc.network}_${doc.projectId}_${projectTokenId}_${tokenId}.png`
            )
            ipfsPng = await axios.post(
              'https://api.pinata.cloud/pinning/pinFileToIPFS',
              imgData,
              {
                maxBodyLength: Infinity,
                headers: {
                  Authorization: `Bearer ${process.env.JWT}`,
                  'Content-Type': `multipart/form-data; boundary=${imgData.getBoundary()}`,
                },
              }
            )

            if (!ipfsPng || !ipfsPng.data || !ipfsPng.data.IpfsHash) {
              throw new Error('png creation failed')
            }
          }
          console.log(
            'asset pinned',
            doc.view,
            doc.projectId,
            projectTokenId,
            tokenId
          )
          // Set image URIs
          if (viewObj.data.isPng) {
            viewObj.data.meta.image = `ipfs://${ipfsPng?.data.IpfsHash}`
            viewObj.data.meta.external_url = `https://communifty.mypinata.cloud/ipfs/${ipfsPng?.data.IpfsHash}`
          } else {
            viewObj.data.meta.image = `ipfs://${ipfsGif?.data.IpfsHash}`
            viewObj.data.meta.external_url = `https://communifty.mypinata.cloud/ipfs/${ipfsGif?.data.IpfsHash}`
          }

          if (viewObj.data.appendGif) {
            viewObj.data.meta.gif_url = `https://communifty.mypinata.cloud/ipfs/${ipfsGif?.data.IpfsHash}`
          }
          // Set mint tx in metadata
          viewObj.data.meta.mintTransactionHash = event.transactionHash
          // Upload json to IPFS
          const jsonBody = {
            pinataMetadata: {
              name: `${doc.network}_${doc.projectId}_${projectTokenId}_${tokenId}.json`,
            },
            pinataContent: viewObj.data.meta,
          }
          const ipfsJSON = await axios.post(
            'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            jsonBody,
            {
              headers: {
                Authorization: `Bearer ${process.env.JWT}`,
              },
            }
          )
          if (!ipfsJSON || !ipfsJSON.data || !ipfsJSON.data.IpfsHash) {
            throw new Error('json creation failed')
          }
          console.log(
            'json pinned',
            doc.view,
            doc.projectId,
            projectTokenId,
            tokenId
          )
          // console.log('ipfs json result:', ipfsJSON.data)
          let updateHash = 'unknown'
          if (!viewObj.data.test) {
            // Set the token URI
            const gasPrice = await getGasPrice()
            const tx = await contract.setTokenURI(
              tokenId,
              `ipfs://${ipfsJSON.data.IpfsHash}`,
              {
                gasLimit: 150000,
                gasPrice: ethers.utils.parseUnits(gasPrice, 'gwei'),
              }
            )
            console.log(
              `setTokenURI ${tokenId} ipfs://${ipfsJSON.data.IpfsHash}`,
              tx.hash,
              gasPrice
            )
            await tx.wait() // wait 1 confirmation, if tx is re-orged we can always backfill
            updateHash = tx.hash
          }
          // Update the DB
          let token: TokenModel = {
            tokenId,
            projectTokenId,
            tokenURI: `ipfs://${ipfsJSON.data.IpfsHash}`,
            mintTxHash: event.transactionHash,
            updateTxHash: updateHash,
            meta: viewObj.data.meta,
          }
          console.log('updating db' )
          await db.collection('projects').updateOne(
            { _id: id },
            {
              $set: {
                lastBlock: event.blockNumber,
                [`tokens.${tokenId}`]: token,
              },
            }
          )
          console.log(
            'db updated',
            doc.view,
            doc.projectId,
            projectTokenId,
            tokenId
          )
          fs.rmdirSync(`${tokenId}`, { recursive: true })
          console.log(
            'complete',
            doc.view,
            doc.projectId,
            projectTokenId,
            tokenId
          )
        } catch (e: any) {
          console.error(
            'nodeP5Controller error',
            typeof e.toJSON === 'function' ? e.toJSON() : e
          )
        }
      }
    }
  }
}
