import "../module/db.module";
import purchaseSchema from "../schema/purchase.schema";

export const fetch=async(request)=>{
    const items = await purchaseSchema.find()
    if (items.length>0)
    {
        return {
            data:items,
            status:200
        }
    }
    else{
        return {
            data:{
                message: "Data Not Found"
            },
            status:404
        }
    }
   
}

export const create= async(request)=>{
    try{
        const data= await request.json()
        const purchase = await new purchaseSchema(data).save()
        return {
            data:purchase,
            status:200
        }
    }
    catch(error)
    {
        return {
            data:error,
            status:424
        }
    }
}