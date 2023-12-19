"use client";
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { LiaShoppingBagSolid } from "react-icons/lia";
import Sidebar from './components/Sidebar';
import { CiSearch } from "react-icons/ci";
import MobileNav from './components/MobileNav';
import { useRouter } from 'next/navigation';


const Navbar = () => {

  const [isOpen,setIsOpen] = useState(false);
  const [isMobileNav,setIsMobileNav] = useState(false);
  const [search,setSearch] = useState('');
  const router = useRouter()


  const isSidebarOpen = (d)=>{setIsOpen(d)}

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
          <header className='shadow py-4 '>



              <nav className="w-[95%] mx-auto flex items-center justify-between">

              <button className='flex flex-col md:hidden' onClick={()=>setIsMobileNav(!isMobileNav)}>
                <span className={`block w-[36px] transition-all duration-300 ${isMobileNav? 'rotate-45 translate-y-[9px]':'rotate-0'} h-2 border-b-black border-b`}></span>
                <span className={`block w-[36px] transition-all duration-300 ${isMobileNav? 'hidden':''} h-2 border-b-black border-b`}></span>
                <span className={`block w-[36px] transition-all duration-300 ${isMobileNav? '-rotate-45':'rotate-0'} h-2 border-b-black border-b`}></span>
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
                  <li>
                    <Link className='btn' href={"/login"}>Login</Link>
                  </li>
                </ul>
              </nav>

          </header>

      <Sidebar state={{isOpen,isSidebarOpen}} />
      <MobileNav state={{isMobileNav,setIsMobileNav}} />

    </>
  )
}

export default Navbar