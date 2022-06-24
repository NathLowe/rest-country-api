import { Box, List, MenuItem, ListItemText, useTheme, Grow, Grid, Typography } from '@mui/material'
import { bgColor,textColor,cardColor, numberComma } from '@shared/data'
import {StoreState} from '@shared/redux/store'
import {changeFilter, changeSearch, FilterType, ReducerState} from '@shared/redux/reducer'
import {
  AiOutlineSearch as SearchIcon
} from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { 
  BsChevronDown as DownIcon
} from 'react-icons/bs'
import Card from '@layouts/Card'


import React, { PropsWithoutRef } from 'react'
import { useRouter } from 'next/router'
import { DataType, CountryType, HomeProps } from '@shared/types';
import { motion } from 'framer-motion'

let Search = ()=>{
  let {mode,filter,search} = useSelector<StoreState,ReducerState>((state)=>state.page)
  let dispatcher = useDispatch()
  let router = useRouter()

  let colorText = textColor(mode)
  let colorCard = cardColor(mode)
  let timeout:null|number = null

  let continents : FilterType[]
  continents = ["africa","america","asia","europe","oceania"]

  let [open,setOpen] = React.useState(false)
  let input = React.useRef<HTMLInputElement>(null)

  let changeInput = (newFilter:FilterType|undefined = undefined)=>()=>{
    let href:string = "/search/"
    
    if(input.current && input.current.value.trim() !=""){
        href+=input.current.value
    }else{
        href+='__bycontinent'
    }
    let continent = newFilter!==undefined ? newFilter : filter
    if(continent!==null){
        href+="?continent="+continent
    }else{
        if(input.current && input.current.value.trim() ==""){
            href = "/"
        }
    }

    if(timeout != null){
        window.clearTimeout(timeout)
    }
    timeout = window.setTimeout(()=>{
        dispatcher(changeSearch(input.current? input.current.value : ''))
        if(href){
            router.push(href)
        }
    },1000)

  }

  let selectFilter = React.useCallback((select:FilterType)=>{
    if(select === filter){
      dispatcher(changeFilter(null))
      changeInput(null)()
    }else{
      dispatcher(changeFilter(select))
      changeInput(select)()
    }
  },[filter])


  React.useEffect(()=>{
    if(input.current){
        input.current.value = search ? search : ''
    }
  })

  return <Box sx={{display:'flex',flexDirection:{xs:'column',md:'row'},alignItems:{md:'center'},justifyContent:'space-between'}}>
    <Card>
      <Box sx={{
        width:{xs:'100%',md:'300px'},display:'flex',alignItems:'center',height:1
      }}>
        <SearchIcon fontSize="20px" color="inherit"/>
        <Box sx={{flex:1,ml:2,
          '& input':{
            backgroundColor:'transparent',width:'100%',height:'100%',color:'inherit',outline:'none',
            border:'none',fontSize:'16px'
          }
        }}>
          <input ref={input} type="text" placeholder='Search for a country...' onChange={changeInput()} />
        </Box>
      </Box>
    </Card>

    <Card>
      <Box sx={{
        display:'flex',alignItems:'center',color:colorText,justifyContent:'space-between',
        cursor:'pointer',width:'200px',height:'100%'
      }}
        onClick={()=>setOpen(!open)}
      >
        <span>Filter by {filter ? filter.toUpperCase() : "Region"}</span>
        <DownIcon fontSize="16px" color="inherit" />
      </Box>
      <Grow in={open}>
          <List sx={{
            position:'absolute',width:'100%',top:'120%',left:0,ListShadow:'0.5px 0.5px 5px rgb(200,200,200,0.5)',
            borderRadius:2,color:colorText,backgroundColor:colorCard
          }}>
            {
              continents.map((continent,index)=>{
                return <MenuItem key={index}
                  onClick={()=>selectFilter(continent)}
                >
                  <ListItemText primaryTypographyProps={{sx:{
                    textTransform:'capitalize',px:1,
                    ...(filter===continent && {color:'#339',fontSize:'1.25rem'})
                  }}} primary={continent} />
                </MenuItem>
              })
            }
          </List>
        </Grow>
    </Card>
  </Box>
}

let Country = ({data,index}:PropsWithoutRef<CountryType>)=>{
  
  let {mode} = useSelector<StoreState,ReducerState>((state)=>state.page)
  let dispatcher = useDispatch()

  let colorText = textColor(mode)
  let colorCard = cardColor(mode)

  let router = useRouter()

  return <motion.div
        style={{width:'100%'}}
        animate={{y:0,opacity:1}}
        initial={{y:200,opacity:0}}
        exit={{y:200,opacity:0}}
        transition={{duration:0.5,delay:index?index*0.2:0}}
    >
        <Box sx={{
            backgroundColor:colorCard,color:colorText,width:1,overflow:'hidden',
            boxShadow:'0.5px 0.5px 3px rgb(15,15,15,0.1)',borderRadius:1,cursor:'pointer'
        }}
            onClick={()=>router.push(`/country/${data.cca3}`)}
        >
            <Box sx={{
            width:'100%',height:{xs:"195px",md:'150px',lg:"180px"},'& img':{width:'100%',height:'100%'},
            boxShadow:'0.5px 0.5px 5px rgb(40,40,40,0.2)'
            }}>
            <img src={data.flags.png} alt={data.name.common} />
            </Box>

            <Box sx={{
            p:3
            }}>
            <Typography variant="h2" color="inherit" noWrap sx={{fontSize:'17px',fontWeight:'800'}}>{data.name.common}</Typography>
            <Box component="ul" sx={{my:2,p:0,'& li':{listStyleType:'none',color:'inherit',fontSize:'15px',py:"0.25rem"}}}>
                <li>
                <span style={{fontWeight:'600'}}>Population :</span> {numberComma(data.population)}
                </li>
                <li>
                <span style={{fontWeight:'600'}}>Region :</span> {data.region}
                </li>
                <li>
                <span style={{fontWeight:'600'}}>Capital :</span> {data.capital && data.capital[0]}
                </li>
            </Box>
            </Box>
        </Box>
    </motion.div>
}

const Index = ({data}:PropsWithoutRef<HomeProps>)=>{

    return <>
        <Search/>
        <Grid container spacing={8} sx={{mt:1}}>
        {
            data.map((country,index)=>{
            return <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <Country data={country} index={index} />
            </Grid>
            })
        }
        </Grid>
    </>
}

export default Index
