import { ConnectDB } from '@/lib/config/db.config';
import { UserModel } from '@/lib/models/User.models';
import { generateToken } from '@/lib/services/Token.service';
import {NextResponse,NextRequest} from 'next/server'

ConnectDB();

export const POST=async(request:NextRequest)=>{
    try {
        
        const {email,password} = await request.json();
        if(!email || !password){
            return NextResponse.json({error:"All Fields Are Required"},{
                status:400
            })
        }

        const existUser = await UserModel.findOne({email});

        if(!existUser){
            return NextResponse.json({error:"User Not Found"},{
                status:400
            })
        }

        /// password check
        const PasswordMatch = await existUser.ComparePassword(password)
        if(!PasswordMatch){
            return NextResponse.json({error:"Invalid Credentials"},{
                status:400
            })
        }

        const token =await  generateToken(existUser);




  const response =  NextResponse.json({msg:"User Login Successfully"},{
                status:200
            })
response.cookies.set("auth",token,{
    httpOnly:true,
    secure:true,
    
})
            
return response


    } catch (error:any) {
            return NextResponse.json({error:error.message},{
                status:500
            })
    }
}