import jwt from 'jsonwebtoken'
import { ApiError } from '@/lib/utils/ApiError';
import httpStatus from 'http-status';

const JWT_AUTH = process.env.JWT_AUTH as string;
const JWT_PAYMENT = process.env.JWT_PAYMENT as string;

export const generateToken = async(user:any)=>{
    const token = jwt.sign({userId:user._id},JWT_AUTH,{
        expiresIn:"30d"
    })
    return token
}

export const generatePaymentToken = async (checkoutId: any) => {
  const token = jwt.sign({ checkoutId: checkoutId }, JWT_PAYMENT, {
    expiresIn: "2h",
  });
  return token;
};


export const VerifyToken = async(token:string)=>{
    try{
        const verify:any = jwt.verify(token,JWT_AUTH)
        return verify['userId'];
    }catch(e:any){
            throw new ApiError(httpStatus.BAD_REQUEST,e.message);
    }
}



export const VerifyPaymentToken = async (token: string) => {
  try {
    const verify: any = jwt.verify(token, JWT_PAYMENT);
    return verify["checkoutId"];
  } catch (e: any) {
    throw new ApiError(httpStatus.BAD_REQUEST, e.message);
  }
};