import { NextResponse } from "next/server"
import { latestMovies } from "../../../../../controller/movies.controller"


export const GET= async(request)=>{
    const response= await latestMovies(request);
    const {data,status}=response;
    return NextResponse.json({data},{status})
}