import { VerifyAdmin } from "@/lib/middleware/VerifyAdmin.middleware";
import { isAuth } from "@/lib/middleware/VerifyUser.middleware";
import { CategoryModel } from "@/lib/models/Category.models";
import { UploadImage } from "@/lib/utils/cloudinary";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async(request:NextRequest)=>{
  try {
    
      const user = await isAuth(request);
      const admin = await VerifyAdmin(user);

      if (!admin) {
        throw new ApiError(httpStatus.BAD_REQUEST, "can not access this route");
      }

      const data = await request.formData();
      
      const image = data.get("image") as unknown as File;
      const category_name = data.get("category_name") as string;


      if(!image || !category_name){
        throw new ApiError(httpStatus.BAD_REQUEST, "All Feilds are required");
      }


      const checkExistCategory = await CategoryModel.findOne({ name: category_name });
      if (checkExistCategory){
        throw new ApiError(httpStatus.BAD_REQUEST, "Category already Exist");
      }





        const upload_result:any = await UploadImage(image, "category");


     const slug = await    slugify(category_name, {
          replacement: "-", // replace spaces with replacement character, defaults to `-`
          remove: undefined, // remove characters that match regex, defaults to `undefined`
          lower: true, // convert to lower case, defaults to `false`
          strict: false, // strip special characters except replacement, defaults to `false`
          locale: "vi", // language code of the locale to use
          trim: true, // trim leading and trailing replacement chars, defaults to `true`
        });

const category = await CategoryModel.create({
  name: category_name,
  slug: slug,
  image: {
    image_url: upload_result.secure_url,
    cloudnary_public_id: upload_result.public_id,
  },
});

return NextResponse.json({msg:"category added"})



  } 
    catch (error:any) {
           const response = NextResponse.json({code:error.statusCode || 500,error:error.message},{
                status:error.statusCode || 500
            })
            return response
    }

}