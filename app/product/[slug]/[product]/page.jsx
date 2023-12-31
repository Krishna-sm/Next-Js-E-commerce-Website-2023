"use client";
import { useGetproductQuery } from '@/provider/redux/query/public.query'
import React from 'react'

import ReactStars from "react-rating-stars-component";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
const SingleProductPage = ({params}) => {

  const  user = useSelector((store)=>store.userSlice.user)

    const {data,isLoading,isError}= useGetproductQuery({slug:params.slug , product:params.product});

    if(isLoading){
    return <div>loading....</div>
  }

  if(isError || !data.product){
    return <div>something went wrong</div>
  }




  const AddToCart = async(product_id)=>{
    try {

      if(!user){
        toast.error("Plese login first");
        return
      }
          toast.success("item addded cart "+product_id)
    } catch (error) {
      toast.error(error.message);
    }
  }


  return (
    // <>
    // {JSON.stringify(data)}{data?.product?.category?.name} {data?.product?.name}
    // </> 
   <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={data?.product?.image?.image_url} />
      <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
        <h2 className="text-sm title-font text-gray-500 tracking-widest uppercase" >{data?.product?.category?.name}</h2>
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{data?.product?.name}</h1>
        <div className="flex mb-4">
          <span className="flex items-center">

             <ReactStars
    count={data.product.rating}
    edit={false}
    
    size={24}
    activeColor="#151515"
  />

          </span>
         
        </div>
        <p className="leading-relaxed">{data?.product?.long_desc}</p>
     
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900"> &#8377;{data?.product?.price}</span>
          <button  onClick={()=>AddToCart(data?.product?._id)} className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Add To Cart</button>
        
        </div>
      </div>
    </div>
  </div>
</section>

  )
}

export default SingleProductPage