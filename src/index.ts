import { ethers } from 'ethers'
import express from 'express'
import { Db, MongoClient } from 'mongodb'
import zmq from 'zeromq'
import ScorpioNFT from '../artifacts/contracts/ScorpioNFT.sol/ScorpioNFT.json'
import * as Controllers from './controllers'
import { ProjectModel } from './models'

const app = express()
const requiredEnv = [
  'MONGO_PWD',
  'INFURA_KEY',
  'PRIVATE_KEY',
  'ETHERSCAN_KEY',
  'CONTRACT',
  'NETWORK',
  'JWT',
]

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    console.error('Missing env', env)
    process.exit(1)
  }
})

const port = process.env.PORT || 3030
const sock = zmq.socket('pub')
sock.bindSync(`tcp://*:${port}`)
console.log('zmq publishing on port', port)

const client = new MongoClient(
  `mongodb+srv://daofi:${process.env.MONGO_PWD}@cluster0.qjd1i.mongodb.net/daofi?retryWrites=true&w=majority`
)
const provider: ethers.providers.JsonRpcProvider =
  new ethers.providers.JsonRpcProvider(
    `https://${process.env.NETWORK}.infura.io/v3/${process.env.INFURA_KEY}`
  )
const wallet: ethers.Wallet = new ethers.Wallet(
  process.env.PRIVATE_KEY || '',
  provider
)
const contract: ethers.Contract = new ethers.Contract(
  process.env.CONTRACT || '',
  ScorpioNFT.abi,
  wallet
)
console.log('Connected contract', process.env.NETWORK, contract.address)
const controllers: { [key: number]: (event: any) => void } = {}

async function main() {
  const db: Db = (await client.connect()).db('scorpio')
  console.info('Conntected to Db scorpio')
  // Get list of projects and iterate
  const projects = db.collection('projects')
  projects.find({}).toArray(async (err, items) => {
    if (err) {
      console.error(err)
      process.exit(1)
    } else if (items) {
      for (const entry of items) {
        const project = entry as ProjectModel
        if (project.network === process.env.NETWORK) {
          // Back-fill events up to latest block
          const blockNumber = await provider.getBlockNumber()
          const logs =
            (await contract.queryFilter(
              contract.filters.Mint(),
              project.lastBlock,
              blockNumber
            )) || []
          for (const event of logs) {
            let projectId = event.args?.projectId_.toNumber()
            sock.send([
              projectId.toString(),
              JSON.stringify(event)
            ])
            console.log('backfill event', event.address, event.transactionHash)
          }
        } else {
          console.warn('Invalid network:', project.projectId, project.network)
        }
      }
      // Listen for mint events and route to project controller
      contract.on(
        'Mint',
        async (projectId, tokenId, projectTokenId, price, to, event) => {
          sock.send([
            projectId.toNumber().toString(),
            JSON.stringify(event)
          ])
          console.log('live event', event.address, event.transactionHash)
        }
      )
    }
  })
}

// Setup listeners then launch server
main()
  .then(() => {
    app.listen(8080, () => console.info('App listening on port 8080'))
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
