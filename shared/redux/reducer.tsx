import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// Type
export type ModeType = 'light'|'dark'
export type FilterType = 'africa'|'america'|'asia'|'europe'|'oceania'|null
export type SearchType = string|null

export interface ReducerState {
    mode: ModeType,
    filter:FilterType,
    search:SearchType
}

let initialState:ReducerState = {
    mode:'light',
    filter:null,
    search:null
}

let reducer = createSlice({
    name:'page',
    initialState,
    reducers:{
        changeMode: (state)=>{
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        changeFilter: (state,action:PayloadAction<FilterType>)=>{
            state.filter = action.payload
        },
        changeSearch: (state,action:PayloadAction<SearchType>)=>{
            state.search = action.payload == '' ? null : action.payload
        },
    }
})

export const { changeMode, changeFilter, changeSearch } = reducer.actions
export default reducer.reducer