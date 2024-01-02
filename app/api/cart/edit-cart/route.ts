import { ConnectDB } from "@/lib/config/db.config";
import { isAuth } from "@/lib/middleware/VerifyUser.middleware";
import { UserModel } from "@/lib/models/User.models";
import httpStatus from "http-status";
import { NextResponse, NextRequest } from "next/server";
import { ApiError } from "@/lib/utils/ApiError";
import { CartModel } from "@/lib/models/Cart.models";
import { ProductModel } from "@/lib/models/Product.models";
ConnectDB();

export const POST = async (request: NextRequest) => {
  try {
    const user = await isAuth(request);

    const existUser: any = await UserModel.findById(user).select("-password");
    if (!existUser) {
      throw new ApiError(401, "User Not Found ");
      return;
    }
    const { id, action }: { id: string; action :string |'increment' | 'decrement'} = await request.json();
    const CHeckExistCart = await CartModel.findOne({
      user: user,
      _id: id,
    });
    if (!CHeckExistCart) {
      throw new ApiError(401, "Product Not Found in Cart ");
    }
   

            if (action === "increment") {
              await CartModel.findByIdAndUpdate(CHeckExistCart._id, {
                qty: CHeckExistCart.qty + 1,
              });
              return NextResponse.json(
                { msg: "Item Added" },
                {
                  status: httpStatus.OK,
                }
              );
            } else if (action === "decrement") {

                if (CHeckExistCart.qty<=1){
                    await CartModel.findByIdAndDelete(CHeckExistCart._id);
                     return NextResponse.json(
                       { msg: "Item removed" },
                       {
                         status: httpStatus.OK,
                       }
                     );
                }
                  await CartModel.findByIdAndUpdate(CHeckExistCart._id, {
                    qty: CHeckExistCart.qty - 1,
                  });
              return NextResponse.json(
                { msg: "Item removed" },
                {
                  status: httpStatus.OK,
                }
              );
            }
              return NextResponse.json(
                { msg: "Item Added" },
                {
                  status: httpStatus.OK,
                }
              );
  } catch (error: any) {
    const response = NextResponse.json(
      { code: error.statusCode || 500, error: error.message },
      {
        status: error.statusCode || 500,
      }
    );
    response.cookies.delete("auth");
    return response;
  }
};
