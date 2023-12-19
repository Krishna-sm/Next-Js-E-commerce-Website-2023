import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";

const Sidebar = ({state}) => {
  return (
    <>
                <div className={`fixed top-0 ${state.isOpen?'translate-x-[-0%]':'translate-x-[100%]'} transition-all duration-500 right-0 h-screen bg-[--main-color] w-full md:w-1/3 z-[9]`}>

                                <div className="py-4 flex justify-end px-5 text-3xl text-white">
                                    <AiOutlineCloseCircle onClick={()=>state.isSidebarOpen(false)} className='cursor-pointer'/>
                                </div>

</div>
    </>
  )
}

export default Sidebar