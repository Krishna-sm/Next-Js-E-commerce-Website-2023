"use client";
import { useAddCategoryMutation, useGetCategoriesQuery } from '@/provider/redux/query/AdminCategory.query';
import { Form, Formik,ErrorMessage,Field } from 'formik'
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import * as yup from 'yup'

const AddProduct = () => {

  const [addCatrogoryFn,addCatrogoryFnResponse] = useAddCategoryMutation()
  const {isLoading,data,isError,refetch} = useGetCategoriesQuery()

  useEffect(()=>{
    refetch()
  },[])

    const validationSchema = yup.object({
        categoryName:yup.string().required("Category is Required"), 
        short_desc:yup.string().required("short_desc is Required"), //50
        long_desc:yup.string().required("long_desc is Required"), //300
        productName:yup.string().required("productName is Required"),
        rating:yup.number().required("Rating is Required"), //10
        price:yup.number().required("price is Required"), 
        image:yup.mixed().required("category image is required") ,
        discount:yup.number().optional(), //100%
    })


    const initialValues ={
        categoryName:'',
        productName:'',
        rating:'',
        short_desc:'',
        long_desc:'',
        discount:'',
        price:"",
        image:null
    }


    const onSubmitHandler = async(e,{resetForm})=>{
        try {
                // console.log({e});
                const form = new FormData();
                form.append("image",e.image)
                form.append("category_name",e.categoryName)


                const {data,error} = await addCatrogoryFn(form);
                if(error){
                  toast.error(error.data?.error);
                  return
                }
                toast.success(data?.msg)

                resetForm();

        } catch (error) {
            toast.error(error.message)
        }
    }

  return (
    <>       
   

    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmitHandler}>
            {({setFieldValue})=>(
        <Form>
                <div className="flex flex-wrap mb-6">
    <div className="w-full   px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
       Select Category Name
      </label>
      <Field as="select"  name={"categoryName"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"   placeholder="Jane" >
        <option value={''} >select Cateogy</option>
        {isLoading && <option disabled>loading...</option>}
                     {!isLoading  && data &&  data.category && data.category.length>0 && data.category.map((cur,i)=>{
                        return  <option key={i} value={cur._id} >{cur.name}</option>
                     })
                    

                     }
      </Field>
      <ErrorMessage name='categoryName' component={'p'} className='text-red-500' />
    </div>

  <div className="w-full   px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
       product Name
      </label>
      <Field  name={"productName"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"   placeholder="Jane" />
     
      <ErrorMessage name='productName' component={'p'} className='text-red-500' />
    </div>

     <div className="w-full   px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Product Picture
      </label>
      <input type="file" onChange={(e)=>{
        setFieldValue("image",e.target.files[0])
      }} name={"image"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"   placeholder="Jane" />
      <ErrorMessage name='image' component={'p'} className='text-red-500' />
    </div>  

             <div className=" w-full md:w-1/2   px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Product Rating
      </label>
        <Field type="number"  name={"rating"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"   placeholder="3.5" />
      <ErrorMessage name='rating' component={'p'} className='text-red-500' />

     
     
    </div> 
    
    <div className=" w-full md:w-1/2   px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Product Price
      </label>
        <Field type="number"  name={"price"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"   placeholder="500" />
      <ErrorMessage name='price' component={'p'} className='text-red-500' />
     
     
    </div> 

    
    <div className=" w-full  px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Product Short Description
      </label>
        <Field  as="textarea" rows={3}  name={"short_desc"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"   placeholder="short message" />
      <ErrorMessage name='short_desc' component={'p'} className='text-red-500' />
     
     
    </div> 

     <div className=" w-full  px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Product Long Description
      </label>
        <Field  as="textarea" rows={5}  name={"long_desc"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"   placeholder="Full message" />
      <ErrorMessage name='long_desc' component={'p'} className='text-red-500' />
     
     
    </div> 

     <div className=" w-full  px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Product Long Description {`(discount percent %)`}
      </label>
        <Field type="number"  name={"discount"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"   placeholder="20%" />
      <ErrorMessage name='discount' component={'p'} className='text-red-500' />
     
     
    </div> 
    
    

    <div className="w-full   px-3 mb-6 md:mb-0">
            <button disabled={addCatrogoryFnResponse.isLoading} type='submit' className="text-white px-4 py-2 rounded-sm bg-black">{addCatrogoryFnResponse.isLoading?'loading...':`Add Category`}</button>
     
    </div>
    
    </div>


        </Form>
  )}
    </Formik>
    </>
  )
}

export default AddProduct
