"use client";
import { useGetCategoriesQuery } from '@/provider/redux/query/public.query'
import Link from 'next/link';
import React, { useEffect } from 'react'



const Card = ({image,slug,name}) => {
  return (
    <>
            <Link href={`/product/${slug}`} className="lg:w-1/4 md:w-1/2  mx-4  p-4 w-full transition-all duration-300 hover:shadow">
        <a className="block relative h-60 rounded overflow-hidden">
          <img alt="ecommerce" className="object-cover object-center w-full h-full block hover:scale-105 transition-all duration-300" src={image} />
        </a>
        <div className="mt-4">
          <h2 className="text-gray-900 title-font text-lg font-medium">{name}</h2>
        </div>
      </Link>
      
    </>
  )
}

const ProductPage = () => {

    const {data,isLoading,refetch,isError} = useGetCategoriesQuery()


    useEffect(()=>{
        refetch()
    },[])

    
    if(isLoading){
        return <div>
            loading...
        </div>
    }



  return (
    <>
       
            
            {!isLoading &&
              data &&
              data.category &&
              data.category.map((cur, i) => {
                  return <Card key={i}  image={cur.image.image_url} slug={cur.slug} name={cur.name}   />
              })
            }
            
      

    </>
  )
}

export default ProductPage