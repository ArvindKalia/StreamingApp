import { NextResponse } from "next/server"
import { activeMovies } from "../../../../../controller/movies.controller"


export const GET= async(request)=>{
    const response= await activeMovies(request);
    const {data,status}=response;
    return NextResponse.json({data},{status})
}