import { ConnectDB } from '@/lib/config/db.config';
import { isAuth } from '@/lib/middleware/VerifyUser.middleware';
import { UserModel } from '@/lib/models/User.models';
import httpStatus from 'http-status';
import {NextResponse,NextRequest} from 'next/server'
import { ApiError } from '@/lib/utils/ApiError';
ConnectDB();

export const GET=async(request:NextRequest)=>{
    try {

        const user= await isAuth(request);

        const existUser:any = await UserModel.findById(user).select("-password");
        if(!existUser){
            throw new ApiError(401,"User Not Found sdad");
            return 
        }

        return NextResponse.json({user:existUser},{
            status:httpStatus.OK
        })

    } catch (error:any) {
           const response = NextResponse.json({code:error.statusCode || 500,error:error.message},{
                status:error.statusCode || 500
            })
            response.cookies.delete("auth");
            return response
    }
}