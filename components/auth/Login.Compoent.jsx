"use client";
import React from 'react'
import {Formik,Form,Field,ErrorMessage} from'formik'
import * as yup from'yup'
import Link from 'next/link';
const LoginComponent = () => {

    const validationSchame = yup.object({
        email:yup.string().email("Email must be valid").required("Email is required").trim().lowercase(),
        password:yup.string().min(6,"Password should greater than 6 characters").required("Password is required").trim()
    })
    
    const onSubmitHandler = async(e,{resetForm})=>{
        console.log(e);
        resetForm()
    }

  return (
    <>
                <Formik validationSchema={validationSchame} initialValues={{email:'',password:''}} onSubmit={onSubmitHandler} > 
                    <Form className='md:w-[44%] w-[96%] mx-auto'>
                        <div className="mb-3">
                            <label htmlFor="email">Email</label>
                            <Field type="email" className="border py-3 w-full px-2 outline-none border-none ring-black ring-[.3px]" placeholder="Enter Your Email " name="email" id="email" />
                            <ErrorMessage component={'p'} className='text-red-500' name='email' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password</label>
                            <Field type="password" className="border py-3 w-full px-2 outline-none border-none ring-black ring-[.3px]" placeholder="Enter Your Password " name="password" id="password" />
                            <ErrorMessage component={'p'} className='text-red-500' name='password' />
                        </div>
                        <div className="mb-3 flex  justify-between">
                                    <button className='btn'>Login</button>
                                    <Link className='hover:text-[--main-color] animate' href={"/"}>Forget Password ?</Link>
                        </div>
                        <div className="mb-3">
                      <p className='text-center'>  Don{"'"}t Have An Account ? <Link className='hover:text-[--main-color] animate' href={"/register"}> Register</Link></p>
                        </div>
                    </Form>
                </Formik>
    </>
  )
}

export default LoginComponent