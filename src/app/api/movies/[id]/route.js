import { NextResponse } from "next/server"
import { fetchbyId,trash,update,makeMovieActive } from "../../../../../controller/movies.controller"


export const GET= async(request,{params})=>{
    const response= await fetchbyId(request,params);
    const {data,status}=response;
    return NextResponse.json({data},{status})
}
export const DELETE= async(request,{params})=>{
    const response= await trash(request,params);
    const {data,status}=response;
    return NextResponse.json({data},{status})
}
export const PUT= async(request,{params})=>{
    const response= await update(request,params);
    const {data,status}=response;
    return NextResponse.json({data},{status})
}
export const PATCH= async(request,{params})=>{
    const response= await makeMovieActive(request,params);
    const {data,status}=response;
    return NextResponse.json({data},{status})
}