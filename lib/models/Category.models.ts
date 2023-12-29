import mongoose from 'mongoose'

const Schema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    slug:{
         type:String,
        required:true,
        unique:true,
        lower:false
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
    }
},{
    timestamps:true
})

export const CategoryModel =
  mongoose.models.Category || mongoose.model("Category", Schema);