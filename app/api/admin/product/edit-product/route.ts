import { VerifyAdmin } from "@/lib/middleware/VerifyAdmin.middleware";
import { isAuth } from "@/lib/middleware/VerifyUser.middleware";
import { ProductModel } from "@/lib/models/Product.models";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(request:NextRequest)=>{
  try {
    
      const user = await isAuth(request);
      const admin = await VerifyAdmin(user);

      if (!admin) {
        throw new ApiError(httpStatus.BAD_REQUEST, "can not access this route");
      }

      const data = await request.json();
console.log({id:data.id});


const product = await ProductModel.findById(data?.id);
if (!product) {
  throw new ApiError(httpStatus.BAD_REQUEST, "Product not exist");
}

if (product?.isPublish) {
  await ProductModel.findByIdAndUpdate(product._id, {
    isPublish: false,
  });

  return NextResponse.json({ msg: "Product UnPublished" });
}

 await ProductModel.findByIdAndUpdate(product._id, {
   isPublish: true,
 });

 return NextResponse.json({ msg: "Product published" });


  } 
    catch (error:any) {
           const response = NextResponse.json({code:error.statusCode || 500,error:error.message},{
                status:error.statusCode || 500
            })
            return response
    }

}