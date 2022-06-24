import Index from '@layouts/Index'
import Layout from '@layouts/Layout'
import { GetServerSidePropsContext, NextPage } from 'next'
import React from 'react'
import { HomeProps, SearchProps, DataType } from '@shared/types';



const Search:NextPage<SearchProps> = ({data}) => {

    React.useEffect(()=>console.log(data))

    return (
        <Layout
            title={""}
            description={""}
        >
            <Index data={data}/>
        </Layout>
    )
}

export default Search

export const getServerSideProps = async (context:GetServerSidePropsContext)=>{
    let maxElements = 12
    let search = ((context.params && context.params.value as string)!).toLocaleLowerCase()
    let continent = context.query.continent ? context.query.continent as string : null

    let href:string
    if(continent != null){
        href = `https://restcountries.com/v3.1/region/${continent}`
    }else{
        href="https://restcountries.com/v3.1/all"
    }

    
    let res = await fetch(href)
    let json : DataType[] = await res.json()
    let filter:string = search == '__bycontinent' ? '' : search

    let data = json.filter((data)=>{
        if(data.name.common.toLocaleLowerCase().indexOf(filter) != -1){
            return true
        }
        return false
    }).map((data,index)=>{
        return index < maxElements ? data : null
    }).filter((data)=>data!=null)
  
    return {
      props:{
        data,
      }
    }
  }
  
