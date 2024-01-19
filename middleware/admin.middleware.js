import { jwtVerify } from "jose";

export const adminMiddleware = (request)=>{
    return new Promise(async(resolve,reject)=>{
        const token = request.cookies.get("admin");
        if (!token)
        {
            return reject(false);
        }
        try{
            const secret= new TextEncoder().encode(process.env.ADMIN_SECRET)
            const data = await jwtVerify(token.value,secret);
            return resolve(true);
        }
        catch(error)
        {
            return reject(false);
        }
    })
}