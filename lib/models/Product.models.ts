import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    slug:{
         type:String,
        required:true,
        unique:true,
        lower:false,
        trim:true
    },
   
    image:{
        type:{
            image_url:{
                type:String
            },
            cloudnary_public_id:{
                type:String
            }
        },
        required:true
    },
    isPublish:{
        type:Boolean,
        default:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    rating:{
        type:Number,
        required:true,
        trim:true
    },
      price:{
        type:Number,
        required:true,
        trim:true
    },
       short_desc:{
        type:String,
        required:true,
        trim:true
    },
    long_desc:{
        type:String,
        required:true,
        trim:true
    },
      discount:{
        type:Number,
        trim:true,
        default:0
    }
},{
    timestamps:true
})

export const ProductModel =
  mongoose.models.product || mongoose.model("product", Schema);