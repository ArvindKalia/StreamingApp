import { NextResponse } from "next/server"
import { jwtVerify } from "jose";
export const middleware= async(request)=>{
    const response= NextResponse.next();
   const url = new URL(request.url);
   const token = url.searchParams.get("token");
if(!token)
return NextResponse.rewrite(new URL ("/register",request.url));
try{
    const secret= new TextEncoder().encode(process.env.ADMIN_SECRET)
    const data = await jwtVerify(token,secret);
    response.cookies.set("admin",token,{httpOnly:true});
    return response;
}
catch(error)
{
    response.cookies.delete("admin")
    return response;
    

}
}

export const config={
    matcher : [
        '/register',
        '/admin-panel/:path*'
    ]
}