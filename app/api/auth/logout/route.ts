import { ConnectDB } from '@/lib/config/db.config';
import {NextResponse,NextRequest} from 'next/server'
ConnectDB();

export const POST=async(request:NextRequest)=>{
    const response = NextResponse.json({msg:"User Logout Successfully"},{
        status:200
    })
    response.cookies.delete("auth");
    return response
}