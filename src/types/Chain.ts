export type IChain = {
  name: string
  rpcURL: string
  chainId: number
  explorerURL: string
  currency: {
    name: string
    symbol: string
    decimals: number
  }
}
