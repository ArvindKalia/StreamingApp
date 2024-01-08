import { NextResponse } from "next/server"
import { fetchById,cancel } from "../../../../../controller/media-convert.controller"

export const GET=async (request,{params})=>{
    const response=await fetchById(request,params);
    const {data,status}= response
    return NextResponse.json({data},{status})
}
export const DELETE=async (request,{params})=>{
    const response=await cancel(request,params);
    const {data,status}= response
    return NextResponse.json({data},{status})
}