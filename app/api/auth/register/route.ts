import { ConnectDB } from '@/lib/config/db.config';
import { UserModel } from '@/lib/models/User.models';
import { generateToken } from '@/lib/services/Token.service';
import {NextResponse,NextRequest} from 'next/server'

ConnectDB();

export const POST=async(request:NextRequest)=>{
    try {
        
        const {email,name,password} = await request.json();
        if(!email || !name || !password){
            return NextResponse.json({error:"All Fields Are Required"},{
                status:400
            })
        }

        const existUser = await UserModel.findOne({email});

        if(existUser){
            return NextResponse.json({error:"User Already Exist"},{
                status:400
            })
        }

      const user=   await UserModel.create({
            email,name,password
        })

        const token =await  generateToken(user);




        const response =  NextResponse.json({msg:"User Register Successfully"},{
                      status:201
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