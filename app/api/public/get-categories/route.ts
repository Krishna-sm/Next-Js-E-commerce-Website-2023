import { CategoryModel } from "@/lib/models/Category.models";
import httpStatus from "http-status";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {


    const category = await CategoryModel.find({ isPublish :true}).select(
      "name image.image_url slug -_id"
    );

    return NextResponse.json({
      msg: "category fetched",
      category,
      total: category.length,
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
