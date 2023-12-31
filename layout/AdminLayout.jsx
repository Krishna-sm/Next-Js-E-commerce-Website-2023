"use client";
import { useUserProfileQuery } from "@/provider/redux/query/Auth.query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React,{useEffect, useState} from "react";
import { MdDashboard } from "react-icons/md";
import { CiUser } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { CiShoppingCart } from "react-icons/ci";
export default function AdminLayout({children}) {
    
    const [loading,setLoading] = useState(true)
    let menuArray = [false, false, false];
    const [menu, setMenu] = useState(menuArray);
    const [show, setShow] = useState(true);

    const {data,isLoading} = useUserProfileQuery()
    const router = useRouter()



    useEffect(()=>{

        if(data && data.user && data.user.role ==="user"){
                router.replace("/")
                return
        }
        else if(!data && !isLoading){
                router.replace("/")
                return
        }
        else if(data && data.user && data.user.role ==="admin"){
            setLoading(false)
        }

    },[data, isLoading])

    if(isLoading || loading){
        return <div>loading...</div>
    }

    if(!data?.user){
                router.push("/")
              return
    }



    const setMenuValue = (props) => {
        let newArr = [...menu];
        newArr[props] = !newArr[props];
        setMenu(newArr);
    }



    const SingleMenu = ({Icon,title,path})=>{
        return <Link href={`/admin${path}`} className="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-white rounded ">
                     <Icon className="text-2xl" />
                        <p className="text-base leading-4 ">{title}</p>
                    </Link>
    }



    const Meganaviagtation = ({title,items})=>{

        const [menu,setMenuValue] = useState(false);
        
        return  <div className="flex flex-col justify-start items-center   px-6 border-b border-gray-600 w-full  ">
                    <button onClick={()=>setMenuValue(!menu)} className="focus:outline-none focus:text-indigo-400  text-white flex justify-between items-center w-full py-5 space-x-14  ">
                        <p className="text-sm leading-5  uppercase">{title}</p>
                 
                        <FaAngleDown className={`${menu ? '' : 'rotate-180'} text-2xl transform duration-100`} />
                    </button>
                    <div id="menu1" className={`${menu ? 'flex' : 'hidden'} justify-start  flex-col w-full md:w-auto items-start pb-1 `}>
                       {
                                items.map((c,i)=>{
                                    return  <Link key={i} href={`/admin`+c.path} className="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-full md:w-52">
                           <c.Icon className="text-2xl"  />
                            <p className="text-base leading-4  ">{c.title}</p>
                        </Link>
                                })
                       }
                       
                    </div>
                </div>
    }


    return (
        <div>
            <div className="rounded-r bg-gray-900 xl:hidden flex justify-between w-full p-6 items-center ">
                <div className="flex justify-between  items-center space-x-3">

                     <Image src={"/bugwear.png"} priority={true} alt='logo' width={1000} height={1000} className='w-44' />
                </div>
                <div aria-label="toggler" className="flex justify-center items-center">
                    <button aria-label="open" id="open" onClick={()=>setShow(true)} className={`${show ? 'hidden' : ''} focus:outline-none focus:ring-2`}>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 6H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 12H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M4 18H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                    <button aria-label="close" id="close" onClick={()=>setShow(false)} className={`${show ? '' : 'hidden'} focus:outline-none focus:ring-2`}>
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 6L6 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6 6L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </div>

                <div className="w-full flex">
                <div id="Main" className={`${show ? 'translate-x-0 z-[9]' : '-translate-x-full z-0'} xl:rounded-r transform  fixed md:relative  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-screen overflow-y-auto  w-full sm:w-64 bg-gray-900 flex-col`}>
                <Link href="/admin" className="hidden xl:flex justify-start p-6 items-center space-x-3">
                <Image src={"/bugwear.png"} priority={true} alt='logo' width={1000} height={1000} className='w-44' />
                </Link>
                <div className="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
                    {/* fasf f  http://localhost:3000/admin/*  */}
                    <SingleMenu Icon={MdDashboard} title="Dashboard" path="/" />
                    <SingleMenu Icon={CiUser} title="User" path="/users" />
                   
                </div>
               
                    {/* mega navigations */}
                    <Meganaviagtation title={"Category"}
                    
                    items={[
                        {
                            path:'/categories/add-category',
                            Icon:CiShoppingCart,
                            title:'Add Category'
                        }
                    ]}
                    />
                    <Meganaviagtation title={"products"}
                    
                    items={[
                        {
                            path:'/products/addProduct',
                            Icon:CiShoppingCart,
                            title:'Add Product'
                        }
                    ]}
                    />

              
            </div>
                    <div className="w-full">
                        {children}
                    </div>
            </div>    
        </div>
    );
}
