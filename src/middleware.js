import { NextResponse } from "next/server"
import { jwtVerify } from "jose";
export const middleware = async (request) => {
    const response = NextResponse.next();

    //Securing admin panel
    const pathname=request.nextUrl.pathname
    if (request.nextUrl.pathname.startsWith('/admin-panel'))
    {
        let cookie= request.cookies.get("authToken")
        if (!cookie)
        {
            return NextResponse.redirect(new URL("/",request.url ))
        }
        try{
            const secret = new TextEncoder().encode(process.env.ADMIN_SECRET)
        const tokenData = await jwtVerify(cookie.value, secret);
        if(tokenData.payload.role==="ADMIN")
        {
            return NextResponse.rewrite(new URL(pathname,request.url ))

        }
        else
        {
            return NextResponse.redirect(new URL("/",request.url ))

        }
        return;
        }
        catch(error)
        {
            return NextResponse.redirect(new URL("/",request.url ))
            
        }
    }
    //handling registration
    const url = new URL(request.url);
    const token = url.searchParams.get("token");
    if (!token)
       { 
        response.cookies.delete("admin")
    return response;
}
    // return NextResponse.rewrite(new URL ("/register",request.url));
    try {
        const secret = new TextEncoder().encode(process.env.ADMIN_SECRET)
        const data = await jwtVerify(token, secret);
        response.cookies.set("admin", token, { httpOnly: true });
        return response;
    }
    catch (error) {
        response.cookies.delete("admin")
        return response;


    }
}

export const config = {
    matcher: [
        '/register',
        '/admin-panel/:path*'
    ]
}