import { NextResponse } from "next/server"
import { fetch,create } from "../../../../controller/s3.controller"

export const GET=async (request)=>{
    const response=await fetch(request);
    const {data,status}= response
    return NextResponse.json({data},{status})
}

export const POST= async(request)=>{
    const response= await create(request);
    const {data,status}=response;
    return NextResponse.json({data},{status})
}