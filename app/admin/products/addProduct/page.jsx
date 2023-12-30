"use client";
import React, { lazy, useState,Suspense } from 'react'
// import AllCategory from '@/components/admin/catrgory/AllCategory'
// import AddCatrogory from '@/components/admin/catrgory/addCategory'

const AddProduct = lazy(()=>import('@/components/admin/product/addProduct'))
const AllProduct = lazy(()=>import('@/components/admin/product/AllProduct'))
const Page = () => {

    const [select,setSelect]= useState(0);


  return (
    <>       
                    <div className="mb-4 py-10 px-5 mx-4">
                                <ul className='flex gap-x-5'>
                                    <li>
                                        <button onClick={()=>setSelect(0)} className='btn'>Add in List</button>
                                    </li>
                                      <li>
                                        <button onClick={()=>setSelect(1)} className='btn'>All List</button>
                                    </li>
                                </ul>
                        </div>    
        <Suspense fallback={<div>loading...</div>}>
                        {
                            select ===0 ?<AddProduct/>:<AllProduct/>
                        }   
                        </Suspense>
    </>
  )
}

export default Page
