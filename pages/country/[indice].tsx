import Card from '@layouts/Card'
import Layout from '@layouts/Layout'
import React from 'react'
import { Box, Container, Grid, Typography } from '@mui/material'
import {
    BsArrowLeft as ArrowIcon
} from 'react-icons/bs'
import { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'

import { bgColor,textColor,cardColor, numberComma } from '@shared/data'
import {StoreState} from '@shared/redux/store'
import {changeFilter, FilterType, ReducerState} from '@shared/redux/reducer'
import { useDispatch, useSelector } from 'react-redux'
import { DataType } from '@shared/types';
import { motion } from 'framer-motion'



const Country:NextPage<{data:DataType}> = ({data}) => {
    let {mode} = useSelector<StoreState,ReducerState>((state)=>state.page)

    let colorText = textColor(mode)
    let colorCard = cardColor(mode)

    let parseCurrencies = (currencies:any)=>{
        let keys = Object.keys(currencies)
        let currency = ""
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            if(index > 0){
                currency+=" ,"
            }
            if(currencies[key] && currencies[key].name){
                currency+= currencies[key].name
            }
        }
        return currency
    }

    let parseLanguages = (languages:any)=>{
        let keys = Object.keys(languages)
        let language = ""
        for (let index = 0; index < keys.length; index++) {
            let key = keys[index];
            if(index > 0){
                language+=" ,"
            }
            if(languages[key]){
                language+= languages[key]
            }
        }
        return language
    }

    let router = useRouter()

    return (
        <Layout
            title={data.name.common}
            description={data.name.common}
        >
            <Box>
                <Card>
                    <Box sx={{
                        width:'100%',display:'flex',alignItems:'center',height:1,cursor:'pointer'
                    }}
                        onClick={()=>router.back()}
                    >
                        <ArrowIcon fontSize="20px" style={{marginRight:'0.25rem'}} color="inherit"/>
                        <span>Back</span>
                    </Box>
                </Card>
            </Box>

            <Grid container alignItems="center" justifyContent="space-between" spacing={3} sx={{mt:3,color:colorText}}>
                <Grid item xs={12} md={5}>
                    <motion.div
                        key={data.name.common}
                        style={{width:'100%'}}
                        animate={{opacity:1,scale:1}}
                        initial={{opacity:0,scale:1.3}}
                        transition={{duration:1}}
                    >
                        <Box sx={{
                            width:'100%',overflow:'hidden',
                            '& img':{
                                width:'100%',height:{xs:'100%',sm:'auto'},boxShadow:'0.5px 0.5px 5px rgb(40,40,40,0.5)'
                            }
                        }}>
                            <img src={data.flags.png} alt={data.name.common} />
                        </Box>
                    </motion.div>
                </Grid>

                <Grid item xs={12} md={6}>
                    <motion.div
                        key={data.name.common}
                        animate={{opacity:1,scale:1}}
                        initial={{opacity:0,scale:0.7}}
                        transition={{duration:1,delay:0.2}}
                    >
                        <Box sx={{px:2}}>
                            <Typography variant="h2" color="inherit" noWrap sx={{fontSize:'19px',fontWeight:'800',mt:3}}>{data.name.common}</Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Box component="ul" sx={{p:0,'& li':{listStyleType:'none',color:'inherit',fontSize:'15px',py:"0.25rem"}}}>
                                        <li>
                                            <span style={{fontWeight:'600'}}>Native Name:</span> {data.altSpellings && data.altSpellings[1]}
                                        </li>
                                        <li>
                                            <span style={{fontWeight:'600'}}>Population:</span> {numberComma(data.population)}
                                        </li>
                                        <li>
                                            <span style={{fontWeight:'600'}}>Region:</span> {data.region}
                                        </li>
                                        <li>
                                            <span style={{fontWeight:'600'}}>Sub Region:</span> {data.subregion}
                                        </li>
                                        <li>
                                            <span style={{fontWeight:'600'}}>Capital:</span> {data.capital && data.capital[0]}
                                        </li>
                                    </Box>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box component="ul" sx={{p:0,'& li':{listStyleType:'none',color:'inherit',fontSize:'15px',py:"0.25rem"}}}>
                                        <li>
                                            <span style={{fontWeight:'600'}}>Top Level Domain:</span> {data.tld && data.tld[0]}
                                        </li>
                                        <li>
                                            <span style={{fontWeight:'600'}}>Currencies:</span> {data.currencies && parseCurrencies(data.currencies)}
                                        </li>
                                        <li>
                                            <span style={{fontWeight:'600'}}>Languages:</span> {data.languages && parseLanguages(data.languages)}
                                        </li>
                                    </Box>
                                </Grid>
                            </Grid>
                            
                            
                            <Typography variant="h2" color="inherit" noWrap sx={{mt:2,fontSize:'17px',fontWeight:'600',width:{md:'fit-content'}}}>Border Countries</Typography>
                            <Grid container spacing={1} >
                                {
                                    data.borders && data.borders.map((border,index)=>{
                                        return <Grid key={index} item xs={3}>
                                            <motion.div style={{cursor:'pointer'}} onClick={()=>router.push(`/country/${border}`)}
                                                key={data.name.common}
                                                animate={{opacity:1,scale:1}}
                                                initial={{opacity:0,scale:1.2}}
                                                transition={{duration:0.5,delay:index*0.2+1.3,stiffness:300}}
                                            >
                                                <Card key={index} maxWidth={true}>
                                                    <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontSize:'15px'}}>
                                                        {border}
                                                    </Box>
                                                </Card>
                                            </motion.div>
                                        </Grid>
                                    })
                                }
                            </Grid>
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
                    
        </Layout>
    )
}

export default Country


export const getServerSideProps = async (context:GetServerSidePropsContext)=>{
    let indice = (context.params && context.params.indice) ? context.params.indice as string : ""
    let res = await fetch(`https://restcountries.com/v3.1/alpha/${indice}`)
    let json = await res.json()

    return {
        props:{
            data: Array.isArray(json) ? json[0] : {}
        }
    }
}