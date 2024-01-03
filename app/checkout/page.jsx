"use client";
import React from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import {loadStripe} from '@stripe/stripe-js/pure';
import * as yup from 'yup'
import { toast } from 'react-toastify';
import { useGetCartsQuery } from '@/provider/redux/query/cart.query';
import { useCheckoutPaymentMutation } from '@/provider/redux/query/Checkout.query';

const CheckoutPage = () => {

  const [AddCheckout,AddCheckoutResponse]= useCheckoutPaymentMutation()
  const {data,isLoading,isError } = useGetCartsQuery();
  if(isLoading){
    <div>loading...</div>
  }
 
  const validationSchema = yup.object({
name:yup.string().required("name is required"),
email:yup.string().email("EMail must be valid").required("Email is required"),
address:yup.string().min(5,"Address should be grather than 5 characters").required("address is required"),
pin_code:yup.string().min(6,"enter 6 digit pin code ").max(6,"ENter 6 digit pin code").required("pin code is required"),
city:yup.string().required("City is required")
  })


  const initialValue = {
    name:'',
    email:'',
    address:"",
    pin_code:'',
    city:'',
  }

  const onSubmitHandler = async(e,{resetForm})=>{
    try {
      // console.log(e)
      const {data,error} = await AddCheckout(e);
      if(error){
        toast.error(error.data.error);
        return
      }
      if(!data.url){
          toast.error("Can not able to make payment");
      }
      window.location.href=data.url
      

    } catch (error) {
        toast.error(error.message)
    }
  }

  return (
    <>
         <section className="text-gray-600 body-font relative">
  <div className="container px-5 py-24 mx-auto">
    <div className="flex flex-col text-center w-full mb-12">
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Checkout</h1>
   </div>
 <div className=" w-full md:w-[90%]">
  <h1 className='text-xl text-black '>Total Price: &#8377;{data && data.totalPrice}/-</h1>
 </div>

    <Formik validationSchema={validationSchema} initialValues={initialValue}  onSubmit={onSubmitHandler} >
       <Form className="w-full md:w-[90%] mx-auto">
      <div className="flex flex-wrap -m-2">
      
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
            <Field type="text" id="name" name="name" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            <ErrorMessage name='name'  className='text-red-500' component={'p'} />
          </div>
        </div>
        
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
            <Field type="email" id="email" name="email" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            <ErrorMessage name='email' className='text-red-500'  component={'p'}  />

          </div>
        </div>
          <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
            <Field as="textarea" rows={3} id="address" name="address" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            <ErrorMessage name='address' className='text-red-500'  component={'p'}  />

          </div>
        </div>
      
      <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
            <Field rows={3} id="city" name="city" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            <ErrorMessage name='city' className='text-red-500'  component={'p'}  />

          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="pin_code" className="leading-7 text-sm text-gray-600">Pin Code</label>
            <Field type="text"  id="pin_code" name="pin_code" className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            <ErrorMessage name='pin_code' className='text-red-500'  component={'p'} />

          </div>
        </div>
        <div className="p-2 w-full flex justify-start items-start">
       {data && data.totalPrice>0 &&   <button disabled={AddCheckoutResponse.isLoading} className=" text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">{AddCheckoutResponse.isLoading?'loading...':'Checkout'}</button>}
        </div>
   
      </div>
    </Form>
    </Formik>


  </div>
</section>

    </>
  )
}

export default CheckoutPage