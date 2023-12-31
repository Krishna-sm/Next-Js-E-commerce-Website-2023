import { ProductModel } from "@/lib/models/Product.models";
import { UploadImage } from "@/lib/utils/cloudinary";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";

export const POST = async(request:NextRequest)=>{
    try{

        const formData = await request.formData();

          const image = formData.get("image") as unknown as File;
          const categoryName = formData.get("categoryName") as string
          const productName = formData.get("productName") as string
          const rating = formData.get("rating") as string
          const short_desc = formData.get("short_desc") as string
          const long_desc = formData.get("long_desc") as string
          const discount = formData.get("discount") as string
          const price = formData.get("price") as string

          const uplaodImageResult:any = await UploadImage(image,'product');

          const slug = slugify(productName, {
            replacement: "-", // replace spaces with replacement character, defaults to `-`
            remove: undefined, // remove characters that match regex, defaults to `undefined`
            lower: true, // convert to lower case, defaults to `false`
            strict: false, // strip special characters except replacement, defaults to `false`
            locale: "vi", // language code of the locale to use
            trim: true, // trim leading and trailing replacement chars, defaults to `true`
          });
      const product =     await ProductModel.create({
            name: productName,
            slug: slug,
            image: {
              image_url: uplaodImageResult.secure_url,
              cloudnary_public_id: uplaodImageResult.public_id,
            },
            category: categoryName,
            rating: rating,
            price: price,
            short_desc: short_desc,
            long_desc:long_desc,
            discount:discount
          });


console.log({ product });


return NextResponse.json({ msg: "product added" });



    }catch(error:any){
           const response = NextResponse.json(
             { code: error.statusCode || 500, error: error.message },
             {
               status: error.statusCode || 500,
             }
           );
           return response;
    }
}