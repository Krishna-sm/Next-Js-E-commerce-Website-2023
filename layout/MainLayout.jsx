"use client";
import {useEffect} from 'react'
import {useUserProfileQuery} from '@/provider/redux/query/Auth.query'
import { useDispatch } from 'react-redux';
import { removeUser, setUser } from '@/provider/redux/slice/User.slice';
import { usePathname } from 'next/navigation';
import {getCookie} from '@/helpers/Server.cookie'
const MainLayout = ({children})=>{
    const dispatch = useDispatch();

    const {data} = useUserProfileQuery()
    // console.log(data);
    const pathName = usePathname()

    const UserData = async()=>{
        const  cookiesAvialble =await getCookie()
        if(cookiesAvialble?.value && data && data.user){
            dispatch(setUser( data.user))
        }else{
            dispatch(removeUser())
        }
    }

    useEffect(()=>{
        ///
        UserData()

    },[pathName,data])

return children

}

export default MainLayout