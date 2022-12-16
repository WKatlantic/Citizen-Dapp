import { createContext } from 'react'
import Web3 from 'web3'
import Web3Provider from './Web3Provider'

interface IWeb3Context {
  account: string | null
  chainId: number | null
  connect: Function
  disconnect: Function
  web3: Web3 | null
  isConnected: boolean
}

export const Web3Context = createContext<IWeb3Context>({
  account: null,
  chainId: null,
  connect: () => {},
  disconnect: () => {},
  web3: null,
  isConnected: false,
})

export default Web3Provider
