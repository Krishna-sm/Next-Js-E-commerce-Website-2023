import { CategoryModel } from "@/lib/models/Category.models";
import { ProductModel } from "@/lib/models/Product.models";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
const {slug}:{slug:string} = await request.json();

const regexExp = new RegExp(slug,"i")

 const products = await ProductModel.find({
  $or: [
    { name: { $regex: regexExp } },
    { slug: { $regex: regexExp } },
    { short_desc: { $regex: regexExp } },
    { long_desc: { $regex: regexExp } }
  ]
})
  .populate("category", "name -_id")
      .select("image.image_url name price discount rating slug");;

  
    
    return NextResponse.json({
      msg: "product fetched",
     products,
      total: products.length,
    });
  } catch (error: any) {
    const response = NextResponse.json(
      { code: error.statusCode || 500, error: error.message },
      {
        status: error.statusCode || 500,
      }
    );
    return response;
  }
};
