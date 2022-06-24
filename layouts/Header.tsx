import { AppBar, Toolbar, Typography, Box, useTheme, Container } from '@mui/material'
import React from 'react'
import { bgColor,textColor,cardColor } from '@shared/data'
import {
    BsMoon as MoonIcon,
    BsSun as SunIcon,
} from 'react-icons/bs'
import { AnimatePresence, motion } from 'framer-motion'
import {StoreState} from '@shared/redux/store'
import {changeMode, ReducerState} from '@shared/redux/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'


const Header = () => {
    let {mode} = useSelector<StoreState,ReducerState>((state)=>state.page)
    let dispatcher = useDispatch()

    let colorBg = bgColor(mode)
    let colorText = textColor(mode)
    let colorCard = cardColor(mode)

    let router = useRouter()

    return (
        <AppBar position='sticky' sx={{
            backgroundColor:colorCard,color:colorText,boxShadow:'0.5px 0.5px 5px rgb(20,20,20,0.3)',zIndex:10
        }}>
            <Container maxWidth="xl" sx={{px:{xs:0,sm:1}}}>
                <Toolbar sx={{display:'flex',alignItems:'center',justifyContent:'space-between',py:3}}>
                    <Typography
                        variant="h1" fontWeight="600" sx={{color:'inherit',fontSize:'25px',cursor:'pointer'}}
                        onClick={()=>router.push('/')}
                    >Where in the world?</Typography>
                    <Box
                        sx={{display:'flex',alignItems:'center',cursor:'pointer'}}
                        onClick={()=>dispatcher(changeMode())}
                    >
                        <AnimatePresence exitBeforeEnter>
                            {
                                mode === "light" ?
                                <motion.div key={mode}>
                                    <MoonIcon fontSize="15px" fontWeight='600' color="inherit"/>
                                </motion.div>
                                :
                                <motion.div key={mode}>
                                    <SunIcon fontSize="25px" fontWeight='600' color="inherit"/>
                                </motion.div>
                            }
                        </AnimatePresence>
                        <Typography component="div" fontWeight='600' sx={{color:'inherit',fontSize:'15px',ml:1}}>
                            {mode === 'light' ? "Dark Mode" : "Light Mode"}
                        </Typography>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header