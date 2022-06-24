import React from 'react'
import { NextPage } from 'next';
import Index from '@layouts/Index';
import Layout from '@layouts/Layout';
import { HomeProps } from '@shared/types';


const Home:NextPage<HomeProps> = ({data}) =>{
  // React.useEffect(()=>console.log(data))

  return (
    <Layout
      title='Where in the world'
      description='This is a Frontend Mentor Challing using an API Rest to build a website.'
    >
      <Index data={data} />
    </Layout>
  )
}

export default Home

export const getServerSideProps = async ()=>{
  let maxElements = 12

  let res = await fetch("https://restcountries.com/v3.1/all")
  let json : any[] = await res.json()

  let data = json.map((data,index)=>{
    return index < maxElements ? data : null
  }).filter((data)=>data!=null)

  return {
    props:{
      data
    }
  }
}
