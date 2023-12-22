"use server"
import { cookies } from 'next/headers'
 
export  async function getCookie() {
  const cookieStore = await cookies()
  const authCookies = await cookieStore.get('auth')
 
    if(authCookies){
        return authCookies
    }
    else{
        return null
    }
}
