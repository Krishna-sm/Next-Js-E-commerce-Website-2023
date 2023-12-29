// const mongoose = require("mongoose")
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
const Schema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"name is required"],
        trim:true
    },
    email:{
        type:String,
        required:true,
        lower:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    isBlock:{
        type:Boolean,
        default:false
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }

},
{
    timestamps:true
})

// middlewares

Schema.pre("save",async function(next){
    const user = this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,10);
    }
    next()
})


// methods
Schema.methods.ComparePassword = async function(string_password:string){
    const user = this;
    const isMatch = await bcrypt.compare(string_password,user.password);
    return isMatch;
}

Schema.methods.UpdatePassword = async function(string_password:string){
 
    const hashPassword = await bcrypt.hash(string_password,10);
    return hashPassword;

}


export const UserModel =  mongoose.models.usermodel || mongoose.model("usermodel",Schema)