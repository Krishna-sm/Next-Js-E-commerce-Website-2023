"use client";
import React, { lazy, useState,Suspense } from 'react'
// import AllCategory from '@/components/admin/catrgory/AllCategory'
// import AddCatrogory from '@/components/admin/catrgory/addCategory'

const AddCatrogory = lazy(()=>import('@/components/admin/catrgory/addCategory'))
const AllCategory = lazy(()=>import('@/components/admin/catrgory/AllCategory'))
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
                            select ===0 ?<AddCatrogory/>:<AllCategory/>
                        }   
                        </Suspense>
    </>
  )
}

export default Page
