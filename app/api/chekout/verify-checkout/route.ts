import { ConnectDB } from "@/lib/config/db.config";
import { isAuth } from "@/lib/middleware/VerifyUser.middleware";
import { UserModel } from "@/lib/models/User.models";
import httpStatus from "http-status";
import { NextResponse, NextRequest } from "next/server";
import { ApiError } from "@/lib/utils/ApiError";
import { CartModel } from "@/lib/models/Cart.models";
import { ProductModel } from "@/lib/models/Product.models";
import { CheckoutModel } from "@/lib/models/Checkout.models";
import Stripe from "stripe";
import { VerifyPaymentToken, generatePaymentToken } from "@/lib/services/Token.service";
const stripe = new Stripe(process.env.SCREATE_KEY as string);
ConnectDB();


export const POST = async (request: NextRequest) => {
  try {
    const user = await isAuth(request);

    const existUser: any = await UserModel.findById(user).select("-password");
    if (!existUser) {
      throw new ApiError(401, "User Not Found ");
      return;
    }

    const {token}:{token:string} =await request.json();


    const checkoutId =await  VerifyPaymentToken(token);
    


const checkExist = await CheckoutModel.findById(checkoutId);


if(!checkExist){
   throw new ApiError(httpStatus.BAD_REQUEST, "unable to verify payment ");
      return;
}


const checkoutSessionDetails = await stripe.checkout.sessions.retrieve(checkExist.session_id);
console.log(checkoutSessionDetails.payment_status );

if (checkoutSessionDetails.payment_status === "paid") {
      // logic

console.log({user:user,product:checkExist?.products})
     const data = await CartModel.updateMany({user:user,product:{$in:checkExist?.products.map((c:any)=>c.product)}},{
      $set:{
         isPurchased: true,
      }
     })

      console.log({data});

      
       
      await CheckoutModel.findByIdAndUpdate(checkExist._id,{
        $set:{
          isComplete:true
        }
    });

    }else{
      throw new ApiError(400, "payment not verified ");
      return;
    }




       
    //   await CheckoutModel.findByIdAndUpdate(checkoutData._id,{
    //     $set:{
    //       session_id:checkoutSession.id
    //     }
    // });




 




    return NextResponse.json(
      { msg: "payment Done"  },
      {
        status: httpStatus.OK,
      }
    );
  } catch (error: any) {

    const response = NextResponse.json(
      { code: error.statusCode || 500, error: error.message ,stack:error.stack},
      {
        status: error.statusCode || 500,
      }
    );
    return response;
  }
};
