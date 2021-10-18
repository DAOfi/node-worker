export interface ViewObject {
  data: {
    repeat: number
    quality: number
    duration: number
    frameRate: number
    test: boolean
    isPng: boolean
    appendGif: boolean
    canvas: any
    meta: any
  }
  sketch: (p: any) => void
}

export interface QueueEvent {
  address: string
  blockHash: string
  blockNumber: number
  blockTimestamp: number
  transactionHash: string
  args: any
}

export type ViewFunc = (
  projectId: number,
  projectTokenId: number,
  tokenId: number,
  event: QueueEvent
) => ViewObject
