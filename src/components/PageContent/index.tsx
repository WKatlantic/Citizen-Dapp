import { Box, styled, Stack, Typography, useMediaQuery } from '@mui/material'
import { ReactNode, useContext } from 'react'
import ConnectButton from '../ConnectButton'
import { Web3Context } from '../../context/Web3'

const Wrapper = styled(Box)`
  flex-grow: 1;
  width: 100%;
  padding: 60px 30px 0px;
  max-width: 1200px;
  @media screen and (max-width: 900px) {
    padding: 30px 30px 0px;
  }
`

export default function PageContent(props: { children: ReactNode }) {
  const { isConnected, account } = useContext(Web3Context)
  const mdDown = useMediaQuery('(max-width: 1000px)')

  return (
    <Wrapper>
      <Stack
        direction={'row'}
        justifyContent={mdDown ? 'space-between' : 'end'}
        spacing={8}
        mb={2}
        alignItems="center"
      >
        <ConnectButton />
        <Box>
          <Typography fontWeight="bold" fontSize={15}>
            Username
          </Typography>
          <Typography>
            {isConnected
              ? account?.slice(0, 5) + '...' + account?.slice(-4)
              : '...'}
          </Typography>
        </Box>
      </Stack>
      {props.children}
    </Wrapper>
  )
}
