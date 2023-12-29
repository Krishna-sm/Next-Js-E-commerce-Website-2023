import { ApiError } from "@/lib/utils/ApiError";
import httpStatus from "http-status";
import { ConnectDB } from "../config/db.config";
import { UserModel } from "../models/User.models";

ConnectDB();


export const VerifyAdmin = async(id:string)=>{
    const checkExitUser = await UserModel.findById(id);

    if(!checkExitUser){
        throw new ApiError(httpStatus.UNAUTHORIZED,"No User Details Found");
    }

    if(checkExitUser.role==='admin'){
        return true;
    }
else{
    return false
}

}