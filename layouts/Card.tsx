import React, { PropsWithChildren } from 'react'
import { Box } from '@mui/material'
import { textColor,cardColor } from '@shared/data'
import {StoreState} from '@shared/redux/store'
import {ReducerState} from '@shared/redux/reducer'
import { useSelector } from 'react-redux'

interface CardType {
    maxWidth?:boolean
}

const Card = ({children,maxWidth}:PropsWithChildren<CardType>) => {
    let {mode} = useSelector<StoreState,ReducerState>((state)=>state.page)

    let colorText = textColor(mode)
    let colorCard = cardColor(mode)
    return (
        <Box sx={{
            backgroundColor:colorCard,height:'40px',boxShadow:'0.5px 0.5px 5px rgb(20,20,20,0.2)',
            borderRadius:2,py:1,px:3,color:colorText,my:1,...(!maxWidth && {width:'fit-content'}),position:'relative'
        }}>
            {children}
        </Box>
    )
}

export default Card