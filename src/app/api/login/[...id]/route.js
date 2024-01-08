import { NextResponse } from "next/server"
import { fetchByID,trash,update } from "../../../../../controller/login.controller"

export const GET=async (request,{params})=>{
    const response = await fetchByID(request,params)
    return NextResponse.json({response},{status:200})
}

export const DELETE=(request,{params})=>{
    const response= trash(request,params)
    const {data,status}= response
    return NextResponse.json({data},{status})

}
export const PUT=async(request,{params})=>{
    const response= await update(request,params)
    const {data,status}= response
    return NextResponse.json({data},{status})
}