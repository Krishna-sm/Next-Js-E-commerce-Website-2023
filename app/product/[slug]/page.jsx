"use client";
import Card from '@/components/market/Card'
import { useGetproductsQuery } from '@/provider/redux/query/public.query'
import React from 'react'

const ProductCard = ({params}) => {

  const {data,isLoading,isError} = useGetproductsQuery(params.slug);


  if(isLoading){
    return <div>loading....</div>
  }

  if(isError){
    return <div>something went wrong</div>
  }

  return (
    <>
            {
         data && data.AllProducts &&data.AllProducts.length>0 &&     data.AllProducts.map((c,i)=>{
                  return <Card image={c.image.image_url} name={c.name} category={c.category.name} price={c.price} slug={c.slug}  key={i}/>
              })
            }
      

    </>
  )
}

export default ProductCard