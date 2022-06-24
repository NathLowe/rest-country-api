import { AppProps } from 'next/app'
import '@shared/globals.css'

import Router from 'next/router'
import nProgress from 'nprogress'
import '@shared/nprogress.css'

import { AnimatePresence } from 'framer-motion'
import { createTheme, ThemeProvider } from '@mui/material'
import Header from '@layouts/Header'
import { Provider } from 'react-redux'
import store from '@shared/redux/store'

let theme = createTheme({
  palette:{
    mode:'light'
  }
})

Router.events.on('routeChangeStart',nProgress.start)
Router.events.on('routeChangeError',nProgress.done)
Router.events.on('routeChangeComplete',nProgress.done)

function MyApp({ Component, pageProps }:AppProps) {
  return <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Header/>
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} />
      </AnimatePresence>
    </ThemeProvider>
  </Provider>
}

export default MyApp
