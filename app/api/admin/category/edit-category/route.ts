import { VerifyAdmin } from "@/lib/middleware/VerifyAdmin.middleware";
import { isAuth } from "@/lib/middleware/VerifyUser.middleware";
import { CategoryModel } from "@/lib/models/Category.models";
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


const category = await CategoryModel.findById(data?.id);
if(!category){
        throw new ApiError(httpStatus.BAD_REQUEST, "Category not exist");

}

if(category?.isPublish){
  await CategoryModel.findByIdAndUpdate(category._id, {
    isPublish:false
  });

return NextResponse.json({ msg: "category UnPublished" });

}

 await CategoryModel.findByIdAndUpdate(category._id, {
   isPublish: true,
 });

 return NextResponse.json({ msg: "category published" });


  } 
    catch (error:any) {
           const response = NextResponse.json({code:error.statusCode || 500,error:error.message},{
                status:error.statusCode || 500
            })
            return response
    }

}