import { Button, styled } from '@mui/material'
import { useCallback, useContext, useState } from 'react'
import { Web3Context } from '../../context/Web3'

const Wrapper = styled(Button)`
  border-radius: 15px;
  text-transform: uppercase;
  background: linear-gradient(264.59deg, #353dfc 0%, #b31df1 100%);
  color: inherit;
  font-weight: bold;
  width: 120px;
  height: 35px;
  padding: 10px;
  font-size: 12px;
  box-shadow: 0px 9px 19px rgb(28 0 96 / 50%);
  &:hover {
    background: linear-gradient(264.59deg, #353dfc 0%, #b31df1 20%);
  }
`

export default function ConnectButton() {
  const {
    connect: walletConnect,
    isConnected,
    account,
    disconnect,
  } = useContext(Web3Context)
  const [connecting, toogleConnecting] = useState<boolean>(false)
  const handleConnect = useCallback(() => {
    if (!isConnected) {
      toogleConnecting(true)
      walletConnect()
        .then(() => toogleConnecting(false))
        .catch(() => toogleConnecting(false))
    } else {
      disconnect()
    }
  }, [walletConnect, isConnected])
  return (
    <Wrapper onClick={handleConnect}>
      {connecting
        ? 'Pending...'
        : isConnected
        ? account?.slice(0, 5) + '...' + account?.slice(-4)
        : 'Connect'}
    </Wrapper>
  )
}
