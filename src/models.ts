import { ObjectId } from 'mongodb'

export interface TokenModel {
  tokenId: number
  projectTokenId: number
  tokenURI: string
  mintTxHash: string
  updateTxHash: string
  meta: any
}

export interface ProjectModel {
  _id: ObjectId
  projectId: number
  network: string
  controller: string
  lastBlock: number
  tokens: { [key: string]: TokenModel }
  view: string
}
