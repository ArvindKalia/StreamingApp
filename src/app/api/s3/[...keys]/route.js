import { NextResponse } from "next/server"
import { fetchByID, trash } from "../../../../../controller/s3.controller"

export const GET=async (request,{params})=>{
    const response = await fetchByID(request,params)
    const {data,status} = response
    return NextResponse.json({data},{status})
}

export const DELETE=async (request,{params})=>{
    const response= await trash(request,params)
    const {data,status}= response
    return NextResponse.json({data},{status})

}
// export const PUT=async(request,{params})=>{
//     const response= await update(request,params)
//     const {data,status}= response
//     return NextResponse.json({data},{status})
// }