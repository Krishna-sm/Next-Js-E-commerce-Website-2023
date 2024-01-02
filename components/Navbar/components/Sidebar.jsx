"use client";
import React, { useEffect } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CiCirclePlus,CiCircleMinus  } from "react-icons/ci";
import { useEditCartMutation, useGetCartsQuery } from '@/provider/redux/query/cart.query';
import { toast } from 'react-toastify';


const ProductCard = ({image,qty,name,price,id,refetch})=>{


  const [EditCart,EditCartResponse] = useEditCartMutation();

  const EditCartFunction = async(action)=>{
    try {
       const {data,error} =await EditCart({id,action})
      if(error){
        toast.error(error?.data?.error);
        return 
      }
      refetch()
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.message);
    }
  }

  return   <div className='px-2 flex  bg-black my-3'> 
                                    <div className="w-1/3">
                                      <img src={image} className='rounded-full w-[200px] h-[200px] object-cover '  alt="" />
                                    </div>
                                    <div className="w-1/3 text-white items-center flex  flex-col justify-center">
                                   <h1 className='font-semibold text-xl  whitespace-nowrap'>{name}</h1>
                                   <h1 className='font-semibold text-xl whitespace-nowrap '>&#8377; {price}/-</h1>
                                    </div>

                                <div className="w-1/3 text-white flex items-center gap-2 text-xl">
                                        <button disabled={EditCartResponse.isLoading} onClick={()=>EditCartFunction('increment')} >
                              <CiCirclePlus/>
                                        </button>
                                        <span>
                            {qty}
                                        </span>
                                        <button disabled={EditCartResponse.isLoading} onClick={()=>EditCartFunction('decrement')} ><CiCircleMinus/></button>
                                    </div>

                                  </div>
}

const Sidebar = ({state}) => {

  const {isLoading,data,refetch} = useGetCartsQuery();
  
useEffect(()=>{
refetch()
},[state.isOpen])

  if(isLoading){
    <div>loading...</div>
  }

  

  return (
    <>
                <div className={`fixed top-0 ${state.isOpen?'translate-x-[-0%]':'translate-x-[100%]'} transition-all duration-500 right-0 h-screen bg-[--main-color] w-full md:w-1/3 z-[9]`}>

                                <div className="py-4 flex justify-between px-5 text-3xl text-white w-full">
                                  <p className="text-xl font-bold">My Cart</p>
                                    <AiOutlineCloseCircle onClick={()=>state.isSidebarOpen(false)} className='cursor-pointer'/>
                                </div>
                                <ul className="">
                                    {
                                      data && data.cart && data.cart.length>0 ? data.cart.map((cur,i)=>{
                                        return <ProductCard id={cur._id} refetch={refetch} image={cur.product.image.image_url} qty={cur.qty}name={cur.product.name} price={cur.product.price} key={i} />
                                      }):<div className='flex flex-col justify-center items-center py-10'>
                                   <HiOutlineShoppingCart className="text-9xl text-white" />
                                  <p className='text-white font-semibold text-xl '>Cart is Empty</p>
                      
                                  </div>
                                    }
                                
                                     

                                  {/* <div className='flex flex-col justify-center items-center py-10'>
                                   <HiOutlineShoppingCart className="text-9xl text-white" />
                                  <p className='text-white font-semibold text-xl'>Cart is Empty</p>
                      
                                  </div> */}
                                </ul>

</div>
    </>
  )
}

export default Sidebar