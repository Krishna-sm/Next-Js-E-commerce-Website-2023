"use client";
import { useEditCategoryMutation, useGetCategoriesQuery,useDeleteCategoryMutation } from '@/provider/redux/query/AdminCategory.query';
import Image from 'next/image';
import React, { useEffect } from 'react'
import { FcCheckmark ,FcCancel} from "react-icons/fc";
import { toast } from 'react-toastify';
const CatrorgyCard = ({data,index,refetch})=>{

  const [editCategory,editCategoryResponse] = useEditCategoryMutation();
  const [deleteCategory,deleteCategoryResponse] = useDeleteCategoryMutation();
  const id = data?._id
  const EditCategoryHandler = async()=>{
    try {
      const {data,error} = await editCategory(id)

      if(error){
        toast.error(error.data?.error);
        return
      }
      else{
        toast.success(data?.msg);
refetch()
      }

    } catch (error) {
      toast.error(error.message);
    }
  }
    const DeleteCategoryHandler = async()=>{
    try {
      const {data,error} = await deleteCategory(id)

      if(error){
        toast.error(error.data?.error);
        return
      }
      else{
        toast.success(data?.msg);
refetch()
      }

    } catch (error) {
      toast.error(error.message);
    }
  }

  return <tr>
<td className='border text-center'>{index}</td>
<td className='border text-center capitalize'>{data?.name}</td>
<td className='border text-center'>t-shirt</td>
<td className='border text-center flex justify-center'>
  {}
    <Image src={data?.image?.image_url} alt={'image'+data?._id} width={200} height={200} className='w-24' />
</td>
<td className='border text-center'>500</td>
<td className='border text-center'>3.5</td>
<td className='border  text-center '>{data?.isPublish?<FcCheckmark/>:<FcCancel/>}</td>
<td className='border text-center'>
  <button  onClick={EditCategoryHandler} disabled={editCategoryResponse.isLoading} className="btn px-3 py-2 rounded-sm text-white mx-2">{editCategoryResponse.isLoading?'loading...':`Edit`}</button>
  <button   disabled={deleteCategoryResponse.isLoading} onClick={DeleteCategoryHandler} className="bg-black px-3 py-2 rounded-sm text-white mx-2">{deleteCategoryResponse.isLoading?
  'loading...':`Delete`}</button>
</td>
</tr>
}

const AllProduct = () => {

  const {isLoading,data,isError,refetch} = useGetCategoriesQuery()

  
  useEffect(()=>{
    refetch()
  },[])
  if(isLoading){
    return <div>loading....</div>
  }

  
  if(isError){
    return <div>something went wrong</div>
  }



  return (
    <>
       

    <table className="table-auto  text-center w-full border">
  <thead>
    <tr>
      <th className='border text-center' scope='rows'>ID</th>
      <th className='border text-center ' scope='rows'>Name</th>
      <th className='border text-center' scope='rows'>Category</th>
      <th className='border text-center' scope='rows'>Image</th>
      <th className='border text-center' scope='rows'>Price</th>
      <th className='border text-center' scope='rows'>Rating</th>
      <th className='border text-center' scope='rows'>isPublic</th>
      <th className='border text-center' scope='rows'>Action</th>
    </tr>
  </thead>
 
  <tbody>
   
        {
          data && data.category && data.category.length>0 && data.category.map((cur,i)=>{
            return <CatrorgyCard key={i} data={cur} index={i+1}  refetch={refetch} />
          })
        }

    {/* <tr className='py-4'>
      <td className='border'>2</td>
      <td className='border'>Hoodies</td>
      <td className='border'><FcCancel/></td>
      <td className='border '>
        <button className="btn px-3 py-2 rounded-sm text-white mx-2">Edit</button>
        <button className="bg-black px-3 py-2 rounded-sm text-white mx-2">Delete</button>
      </td>
    </tr>
    */}
  </tbody>
</table>


    </>
  )
}

export default AllProduct
