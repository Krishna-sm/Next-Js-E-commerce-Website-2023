import { CategoryModel } from "@/lib/models/Category.models";
import { ProductModel } from "@/lib/models/Product.models";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  ctx: { params: { product: string } }
) => {
  try {
    const existProduct = await ProductModel.findOne({
      slug: ctx.params.product,
    })
    .populate("category", "name -_id");

    if (!existProduct) {
      throw new ApiError(httpStatus.NOT_FOUND, "Category not found");
    }

    // const AllProducts = await ProductModel.find({
    //   category: existCategory._id,
    //   isPublish: true,
    // })
    //   .populate("category", "name -_id")
    //   .select("image.image_url name price discount rating slug");

    return NextResponse.json({
      msg: "product fetched",
      product: existProduct
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
