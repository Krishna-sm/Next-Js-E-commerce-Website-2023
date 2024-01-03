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
import { generatePaymentToken } from "@/lib/services/Token.service";
const stripe = new Stripe(process.env.SCREATE_KEY as string);
ConnectDB();


interface CheckOutDetail{
  name:string;
  email:string;
  address:string;
  pin_code:string;
  city:string;
}

export const POST = async (request: NextRequest) => {
  try {
    const user = await isAuth(request);

    const existUser: any = await UserModel.findById(user).select("-password");
    if (!existUser) {
      throw new ApiError(401, "User Not Found ");
      return;
    }

        const CHeckExistCart = await CartModel.find({
          user: user,
        }).select("product qty -_id");
   const check = await CartModel.find({
     user: user,
     isPurchased: false,
   })
     .populate("product", "name price image.image_url")
     .select("qty");

   const totalPrice = check.reduce((acc, item) => {
     const itemPrice = item.product.price * item.qty;
     return acc + itemPrice;
   }, 0);
    const data:CheckOutDetail = await request.json();

    // const item = {
    //   name: data.name,
    //   email: data.email,
    //   address: data.address,
    //   pin_code: data.pin_code,
    //   city: data.city,
    //   user: user,
    //   products: CHeckExistCart,
    // };

    const checkoutData = await CheckoutModel.create({
      name: data.name,
      email: data.email,
      address: data.address,
      pin_code: data.pin_code,
      city: data.city,
      user: user,
      products: CHeckExistCart,
      final_price: totalPrice,
    });



    const token = await generatePaymentToken(checkoutData._id);
    if(!token){
         throw new ApiError(401, "unable to make payment ");
         return;
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "bugs wear product",
            },
            unit_amount: totalPrice * 100,
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/payment/sccuess?token=" + token,
      cancel_url: "http://localhost:3000/payment/cancel?token=" + token,
    });


console.log({ checkoutSession });







    return NextResponse.json(
      { msg: "payment process", url: checkoutSession.url },
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
