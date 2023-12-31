import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { CiCirclePlus,CiCircleMinus  } from "react-icons/ci";


const ProductCard = ()=>{
  return   <div className='px-2 flex  bg-black my-3'> 
                                    <div className="w-1/3">
                                      <img src="https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-05.jpg" className='rounded-full'  alt="" />
                                    </div>
                                    <div className="w-1/3 text-white items-center flex  flex-col justify-center">
                                   <h1 className='font-semibold text-xl  whitespace-nowrap'>product name</h1>
                                   <h1 className='font-semibold text-xl whitespace-nowrap '>&#8377; 55/-</h1>
                                    </div>

                                <div className="w-1/3 text-white flex items-center gap-2 text-xl">
                                        <span>
                              <CiCirclePlus/>
                                        </span>
                                        <span>
                            0
                                        </span>
                                        <span><CiCircleMinus/></span>
                                    </div>

                                  </div>
}

const Sidebar = ({state}) => {
  return (
    <>
                <div className={`fixed top-0 ${state.isOpen?'translate-x-[-0%]':'translate-x-[100%]'} transition-all duration-500 right-0 h-screen bg-[--main-color] w-full md:w-1/3 z-[9]`}>

                                <div className="py-4 flex justify-between px-5 text-3xl text-white w-full">
                                  <p className="text-xl font-bold">My Cart</p>
                                    <AiOutlineCloseCircle onClick={()=>state.isSidebarOpen(false)} className='cursor-pointer'/>
                                </div>
                                <div className="">
                                    <ProductCard/>
                                    <ProductCard/>
                                    <ProductCard/>
                                
                                  {/* <div className='flex flex-col justify-center items-center py-10'>
                                   <HiOutlineShoppingCart className="text-9xl text-white" />
                                  <p className='text-white font-semibold text-xl'>Cart is Empty</p>
                      
                                  </div> */}
                                </div>

</div>
    </>
  )
}

export default Sidebar