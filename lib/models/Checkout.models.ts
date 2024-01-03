import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pin_code: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "usermodel",
      required: true,
    },
    products: {
      type: [
        {
          product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
            
          },
          qty:{
            type:Number
          }
        },
      ],
    },
    final_price:{
        type:String,
        required:true
    },
    isComplete:{
        type:Boolean,
        default:false
    }
  },
  {
    timestamps: true,
  }
);

export const CheckoutModel =
  mongoose.models.CheckoutDetails || mongoose.model("CheckoutDetails", Schema);
