import { NextRequest, NextResponse } from "next/server";

export const middleware = (request:NextRequest)=>{

    const pathVariable = request.nextUrl.pathname;
    // console.log(pathVariable)
    const isPublicPath = pathVariable ==='/login' || pathVariable ==='/register';

    const auth = request.cookies.get("auth") || '';

    if(auth && isPublicPath)  {
                return NextResponse.redirect(new URL("/",request.url));
    }

}


export const config = {
    matcher: '/:path*',
  }