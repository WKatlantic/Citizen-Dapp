import { Box, Stack, styled } from '@mui/material'
import { ReactNode } from 'react'
import NavMenu from '../NavMenu'
import Footer from '../Footer'
import PageContent from '../PageContent'
import { Notification } from '../Notification'

export default function Layout(props: { children: ReactNode }) {
  return (
    <LayoutWrapper>
      <NavMenu />
      <Mainboard>
        <PageContent>{props.children}</PageContent>
        <Footer />
      </Mainboard>
      <Notification />
    </LayoutWrapper>
  )
}

const LayoutWrapper = styled(Box)`
  height: 100vh;
  width: 100vw;
  display: flex;
  @media screen and (max-width: 899px) {
    display: block;
  }
`

const Mainboard = styled(Stack)`
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: auto;
  @media screen and (max-width: 900px) {
    height: calc(100vh - 64px);
  }
  @media screen and (max-width: 600px) {
    height: calc(100vh - 40px);
  }
  align-items: center;
`
