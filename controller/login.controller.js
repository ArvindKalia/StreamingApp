import "../module/db.module"
import loginMiddleware from "../middleware/login.middleware"
import loginSchema from "../schema/login.schema";

export const fetch = async (request)=>{
   try{
    await loginMiddleware(request);
    return {
    data : "fetch Success",
    status : 200
   }
   } catch(error){
    return {
        data : error,
        status : 401
   }
}}

export const fetchByID = async(request,params) =>{
    return{
        data: params,
        status: 200
    }
}

export const create= async(request)=>{
    try{
        const data= await request.json();
   const userRes = await new loginSchema(data).save();
   return {
    data : userRes,
    status : 200
       }
       } catch(error){
        return {
            data : error,
            status : 401
       }
    }
}

export const trash= (request,params)=>{
    
    return {
        data: params,
        status: 200
    }
}

export const update= async(request,params)=>{
    const data= await request.json();
    return {
            data: {
                data,
                params
            },
        status: 200
    }}
