import { Box, Container } from '@mui/material'
import { motion } from 'framer-motion'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import {StoreState} from '@shared/redux/store'
import {ReducerState} from '@shared/redux/reducer'
import { useSelector } from 'react-redux'
import { bgColor,textColor,cardColor } from '@shared/data'


interface LayoutType {
  title:string,
  description:string
}


const Layout = ({children,title,description}:PropsWithChildren<LayoutType>) => {
  let {mode} = useSelector<StoreState,ReducerState>((state)=>state.page)

  let colorBg = bgColor(mode)
  let colorText = textColor(mode)
  let colorCard = cardColor(mode)

  return (
    <motion.main
      style={{flex:1,backgroundColor:colorBg}}
    >
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="Frontend,React,API,Countries,Africa" />
      </Head>
      <Container maxWidth={false} sx={{px:{xs:1,sm:2},pt:5,height:1,pb:4}}>
        <Box sx={{maxWidth:'1300px',mx:'auto'}}>
          {children}
        </Box>
      </Container>
    </motion.main>
  )
}

export default Layout