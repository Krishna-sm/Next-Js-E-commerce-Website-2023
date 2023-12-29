"use client";
import { useAddCategoryMutation } from '@/provider/redux/query/AdminCategory.query';
import { Form, Formik,ErrorMessage,Field } from 'formik'
import React from 'react'
import { toast } from 'react-toastify';
import * as yup from 'yup'

const AddCatrogory = () => {

  const [addCatrogoryFn,addCatrogoryFnResponse] = useAddCategoryMutation()

    const validationSchema = yup.object({
        categoryName:yup.string().required("Name is Required"),
        image:yup.mixed().required("category image is required")
    })


    const initialValues ={
        categoryName:'',
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
        Category Name
      </label>
      <Field  name={"categoryName"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"  type="text" placeholder="Jane" />
      <ErrorMessage name='categoryName' component={'p'} className='text-red-500' />
    </div>
     <div className="w-full   px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" >
        Category Name
      </label>
      <input type="file" onChange={(e)=>{
        setFieldValue("image",e.target.files[0])
      }} name={"image"} className="appearance-none block w-full  text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white ring-black ring-[.3px]"   placeholder="Jane" />
      <ErrorMessage name='image' component={'p'} className='text-red-500' />
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

export default AddCatrogory
