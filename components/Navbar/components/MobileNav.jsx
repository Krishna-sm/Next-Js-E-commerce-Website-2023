import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";

const MobileNav = ({state:{isMobileNav,setIsMobileNav}}) => {
  return (
    <>
                <div className={` fixed md:hidden top-0 ${isMobileNav?'translate-x-[0%]':'translate-x-[-100%]'} transition-all duration-500 right-0 h-screen bg-[#000] w-full md:w-1/3 z-[9]`}>

                                <div className="py-4 flex justify-start px-5 text-3xl text-white">
                                    <AiOutlineCloseCircle onClick={()=>setIsMobileNav(false)} className='cursor-pointer'/>
                                </div>

</div>
    </>
  )
}

export default MobileNav