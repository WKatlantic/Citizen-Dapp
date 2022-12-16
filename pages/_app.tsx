import { ThemeProvider, CssBaseline } from '@mui/material'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { DefaultTheme } from '../styles/theme'
import Layout from '../src/components/Layout'
import { store } from '../src/store/redux/store'

const Web3Provider = dynamic(() => import('../src/context/Web3'), {
  ssr: false,
})

function Providers(props: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={DefaultTheme}>
        <Web3Provider>
          <CssBaseline />
          <Layout>{props.children}</Layout>
        </Web3Provider>
      </ThemeProvider>
    </Provider>
  )
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  )
}
