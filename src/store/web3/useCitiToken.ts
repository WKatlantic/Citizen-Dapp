import { useCallback, useContext, useState, useEffect } from 'react'
import { Web3Context } from '../../context/Web3'
import ERC20 from './abis/ERC20.json'
import { CITITOKEN } from '../../config/constants'

export default function useCitiToken() {
  const { isConnected, account, web3 } = useContext(Web3Context)
  const [CITI, setCITI] = useState<any>(null)

  useEffect(() => {
    if (web3 !== null) {
      setCITI(new web3.eth.Contract(ERC20 as any[], CITITOKEN))
    }
  }, [web3])

  const balanceOf = useCallback(
    async (addr: string) => {
      if (CITI !== null)
        return await CITI?.methods.balanceOf(addr).call({ from: account })
      return 0
    },
    [CITI],
  )

  return { isConnected, account, balanceOf, web3 }
}
