import {NextRequest} from 'next/server'
import { VerifyToken } from '@/lib/services/Token.service';
import { ApiError } from '@/lib/utils/ApiError';
import httpStatus from 'http-status';
export const isAuth = async(request:NextRequest)=>{
    const token = await request.cookies.get("auth")
    if(!token){
                // error
                throw new ApiError(httpStatus.UNAUTHORIZED,"Please login first");
    }
    const user = await VerifyToken(token.value);
    if(!user){
        throw new ApiError(httpStatus.BAD_REQUEST,"User Not Found");
    }

    return user;
}