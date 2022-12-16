import WalletConnectProvider from '@walletconnect/web3-provider'
import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import Web3 from 'web3'
import Web3Modal from 'web3modal'
import { Web3Context } from './index'
import { SUPPORTED_CHAIN } from '../../config/constants'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      rpc: {
        // 56: rpcUrls[56],
        // 97: rpcUrls[97],
        // 1337: rpcUrls[1337],
      },
      network: 'binance',
    },
  },
}

export default function Web3Provider(props: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnected, toggleConnection] = useState<boolean>(false)
  const [web3, setWeb3] = useState<Web3 | null>(null)
  const web3Modal = useMemo(
    () =>
      new Web3Modal({
        cacheProvider: true,
        providerOptions,
        disableInjectedProvider: false,
      }),
    [],
  )

  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect()
    }
  }, [web3Modal])

  const reset = useCallback(() => {
    setWeb3(null)
    setAccount(null)
    toggleConnection(false)
  }, [])

  const checkNetwork = useCallback(async () => {
    if (window.ethereum) {
      const currentChainId = await window.ethereum.request({
        method: 'eth_chainId',
      })
      return Number(SUPPORTED_CHAIN.chainId) === Number(currentChainId)
    }
  }, [])

  const switchNetwork = useCallback(async (targetId: number) => {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x' + targetId.toString(16) }],
    })
  }, [])

  const addNetwork = useCallback(async () => {
    window.ethereum
      .request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: '0x' + SUPPORTED_CHAIN.chainId.toString(16),
            chainName: SUPPORTED_CHAIN.name,
            nativeCurrency: SUPPORTED_CHAIN.currency,
            rpcUrls: [SUPPORTED_CHAIN.rpcURL],
            blockExplorerUrls: [SUPPORTED_CHAIN.explorerURL],
          },
        ],
      })
      .catch((error: any) => {
        console.log(error)
      })
  }, [])

  const subscribeProvider = useCallback(
    async (provider: any, web3: Web3) => {
      if (!provider.on) return

      provider.on('disconnect', () => {
        reset()
      })

      provider.on('accountsChanged', async (accounts: string[]) => {
        setAccount(web3.utils.toChecksumAddress(accounts[0]))
      })

      provider.on('chainChanged', async (chainId: number) => {
        console.log('Chain changed: ', chainId)
      })
    },
    [reset],
  )

  const connect = useCallback(async () => {
    const provider = await web3Modal.connect()
    if (!(await checkNetwork())) {
      await addNetwork()
      await switchNetwork(SUPPORTED_CHAIN.chainId)
    }
    const web3 = new Web3(provider)

    await subscribeProvider(provider, web3)
    const accounts = await web3.eth.getAccounts()
    const chainId = await web3.eth.getChainId()

    setWeb3(web3)
    setAccount(web3.utils.toChecksumAddress(accounts[0]))
    setChainId(chainId)
    toggleConnection(true)
  }, [web3Modal, subscribeProvider])

  const disconnect = useCallback(async () => {
    if (web3 && web3.currentProvider) {
      const _provider: any = web3.currentProvider
      if (_provider.close) await _provider.close()
    }
    if (web3Modal) {
      await web3Modal.clearCachedProvider()
    }
    reset()
  }, [web3Modal, web3, reset])

  return (
    <Web3Context.Provider
      value={{ account, chainId, connect, disconnect, isConnected, web3 }}
    >
      {props.children}
    </Web3Context.Provider>
  )
}
