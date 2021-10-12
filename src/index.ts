import { ethers } from 'ethers'
import express, { Request } from 'express'
import { Db, MongoClient } from 'mongodb'
import Queue from 'async-await-queue'
import zmq from 'zeromq'
import ScorpioNFT from './ScorpioNFT.json'
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
let db: Db

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    console.error('Missing env', env)
    process.exit(1)
  }
})

const endpoint = process.env.ENDPOINT || 'tcp://127.0.0.1:3030'
const sock = zmq.socket('sub')
sock.connect(endpoint)
console.log('zmq connected to endpoint', endpoint)

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
console.log('Connected wallet', process.env.NETWORK, wallet.address)
const contract: ethers.Contract = new ethers.Contract(
  process.env.CONTRACT || '',
  ScorpioNFT.abi,
  wallet
)
console.log('Connected contract', process.env.NETWORK, contract.address)
const controllers: { [key: number]: (event: any) => void } = {}

const queue = new Queue(1, 2000)

async function subscribe() {
  // Get list of contracts and iterate
  const projects = db.collection('projects')
  projects.find({}).toArray(async (err, items) => {
    if (err) {
      console.error(err)
      process.exit(1)
    } else if (items) {
      for (const entry of items) {
        const project = entry as ProjectModel
        if (project.network === process.env.NETWORK) {
          if (Controllers.hasOwnProperty(project.controller)) {
            // Setup controller
            const controllerFunc = (Controllers as any)[project.controller]
            controllers[project.projectId] = await controllerFunc(
              contract,
              db,
              project._id
            )
            // Re-subscribe to topic
            sock.unsubscribe(project.projectId.toString())
            sock.subscribe(project.projectId.toString())
            console.log('Subscribed to project', project.projectId)
          } else {
            console.error(
              'Invalid controller:',
              project.projectId,
              project.controller
            )
          }
        } else {
          console.warn('Invalid network:', project.projectId, project.network)
        }
      }
    }
  })
}

async function main() {
  db = (await client.connect()).db('scorpio')
  console.info('Conntected to scorpio db')
  await subscribe()
  // Listen for zmq events
  sock.on('message', async (projectIdStr, eventStr) => {
    const projectId = parseInt(projectIdStr)
    if (controllers.hasOwnProperty(projectId)) {
      const event = JSON.parse(eventStr.toString())
      console.log(
        'event',
        process.env.NETWORK,
        projectId,
        event.args.projectTokenId,
        event.args.tokenId,
        event.transactionHash
      )
      queue.run(() => controllers[projectId](event))
    }
  })
}

// Setup listeners then launch server
main()
  .then(() => {
    app.post(
      '/subscribe',
      async (req: Request, res: express.Response): Promise<void> => {
        const token = req.headers.authorization?.split(' ')[1]
        if (token && token === process.env.JWT) {
          await subscribe()
          res.send({ success: true })
        } else {
          res.sendStatus(403)
        }
      }
    )
    app.listen(8081, () => console.info('Worker API listening on port 8081'))
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
