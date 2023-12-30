"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { LiaShoppingBagSolid } from "react-icons/lia";
import Sidebar from './components/Sidebar';
import { CiSearch } from "react-icons/ci";
import MobileNav from './components/MobileNav';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { RxAvatar } from "react-icons/rx";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useDispatch, useSelector } from 'react-redux';
import { removeUser } from '@/provider/redux/slice/User.slice';
import { useLogoutUserMutation } from '@/provider/redux/query/Auth.query';

const Navbar = () => {
const AuthUser = useSelector((store)=>store?.userSlice?.user);
const dispatch = useDispatch()
  const [isOpen,setIsOpen] = useState(false);
  const [isMobileNav,setIsMobileNav] = useState(false);
  const [logoutUser] = useLogoutUserMutation()
  const [search,setSearch] = useState('');
  const router = useRouter()
  // console.log({AuthUser})


  const isSidebarOpen = (d)=>{setIsOpen(d)}

  const LogoutHandler = async()=>{
        try {
                // api 
                const {data,error} = await logoutUser()
                if(error){
                  console.log(error);
                  return
                }

                toast.success(data.msg)

                dispatch(removeUser())
        } catch (error) {
          toast.error(error.message)
        }
  }

  const SearchHandler = (e)=>{
    e.preventDefault()
    if(!search){
      return
    }
    router.push(`/search?query=${search}`)
  }
  // const isMobileNav = (d)=>{setIsOpen(d)}

  return (
      <>
      <ToastContainer/>
          <header className='shadow py-4 '>



              <nav className="w-[95%] mx-auto flex items-center justify-between">

              <button className={`flex flex-col md:hidden  ${isMobileNav?
              'z-[9] ':'z-0'}`} onClick={()=>setIsMobileNav(!isMobileNav)}>
                <span className={`block w-[36px] transition-all duration-300 ${isMobileNav? 'rotate-45 translate-y-[9px]  border-b-white':'rotate-0 border-b-black'} h-2  border-b`}></span>
                <span className={`block w-[36px] transition-all duration-300 ${isMobileNav? 'hidden  border-b-white':'border-b-black'} h-2  border-b`}></span>
                <span className={`block w-[36px] transition-all duration-300 ${isMobileNav? '-rotate-45  border-b-white':'rotate-0 border-b-black '} h-2 border-b`}></span>
              </button>

                <Image src={"/bugwear.png"} priority={true} alt='logo' width={1000} height={1000} className='w-44' />

                <form onSubmit={SearchHandler} className='w-1/2 hidden  md:flex items-center px-3 boder ring-black ring-[.3px]'>
                    <input value={search} onChange={e=>setSearch(e.target.value)} type="text" name="" className='w-full  py-3 outline-none border-none' id="" placeholder='Search ...' />
                    <button type="submit"><CiSearch className='text-3xl ' /></button>

                </form>

                      <LiaShoppingBagSolid className='text-3xl md:hidden cursor-pointer'  onClick={()=>isSidebarOpen(true)}  />


                <ul className='hidden transition-all duration-300 md:flex items-center gap-x-3'>
                  <li>
                    <Link className='transition-all duration-300 hover:text-[--main-color]' href={"/"}>Home</Link>
                  </li>
                  <li>
                    <Link className='transition-all duration-300 hover:text-[--main-color]' href={"/t-shirt"}>T-shirt</Link>
                  </li>
                  <li>
                    <Link className='transition-all duration-300 hover:text-[--main-color]' href={"/mugs"}>Mugs</Link>
                  </li>
                  <li>
                    <Link className='transition-all duration-300 hover:text-[--main-color]' href={"/stickers"}>Stickers</Link>
                  </li>
                  <li>
                    <Link className='transition-all duration-300 hover:text-[--main-color]' href={"/hoodies"}>Hoodies</Link>
                  </li>
                  <li>
                  <LiaShoppingBagSolid className='text-3xl cursor-pointer'  onClick={()=>isSidebarOpen(true)}  />

                  </li>
                 { !AuthUser?<li>
                    <Link className='btn' href={"/login"}>Login</Link>
                  </li>
            :
                  <li>
                  <DropdownMenu  > 
  <DropdownMenuTrigger  >     <RxAvatar className='text-3xl cursor-pointer' /></DropdownMenuTrigger>
  <DropdownMenuContent >
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>
      <Link href={AuthUser.role ==="admin"?"/admin":"/profile"}>Profile</Link>
    </DropdownMenuItem>
    <DropdownMenuItem>
    <Link href={"/orders"}>Orders</Link>

    </DropdownMenuItem>
    <DropdownMenuItem onClick={LogoutHandler} >Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
               
                  </li>}
                </ul>
              </nav>

          </header>

      <Sidebar state={{isOpen,isSidebarOpen}} />
      <MobileNav state={{isMobileNav,setIsMobileNav}} />

    </>
  )
}

export default Navbar