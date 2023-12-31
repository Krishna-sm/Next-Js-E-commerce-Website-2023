import Card from '@/components/market/Card'
import React from 'react'

const page = () => {
  return (
    <>
       
            {
              Array(20).fill(null).map((c,i)=>{
                  return <Card key={i}/>
              })
            }
      

    </>
  )
}

export default page