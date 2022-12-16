import { IChain } from '../types/Chain'

// export const BASE_URL = 'http://localhost:5000/'
export const BASE_URL = "https://fine-puce-turkey-toga.cyclic.app/"


// Myaccount Page stores
export const PROJECT_TYPE = ['Token', 'NFT']
export const PROJECT_STATUS = ['Presale', 'Launching', 'Launched']
export const VETTING_STATUS = ['Pending', 'Passed', 'Rejected']
export const LISTING_TYPE = ['Paid', 'Free - NFT VIP']
export const BLOCKCHAINS = [
  'Binance Smart Chain',
  'Ethereum',
  'Solana',
  'Avalanche',
  'Cardano',
  'Chainalysis KYT',
  'Hyperledger Fabic',
  'Hyperledger Sawtooth',
  'IBM Blockchain',
  'Polkadot',
  'Ripple',
  'TronDao',
  'XDC Network',
]

// Deployed contracts
export const CITITOKEN = '0x7Cadf237f728820E0E53579A285186Dd8169A615'
export const SUBMISSION = '0x6C4090ca98035c91F5ef89528F3e522416cF1AAa'

export const SUPPORTED_CHAIN: IChain = {
  name: 'BSC Testnet',
  rpcURL: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  chainId: 97,
  explorerURL: 'https://testnet.bscscan.com/',
  currency: {
    name: 'Binance Coin',
    symbol: 'BNB',
    decimals: 18,
  },
}

// {
//   name: 'Binance Smart Chain',
//   rpcURL: 'https://bsc-dataseed1.ninicoin.io',
//   chainId: 56,
//   explorerURL: 'https://bscscan.com',
//   currency: {
//     name: 'Binance Coin',
//     symbol: 'BNB',
//     decimals: 18,
//   },
// },
