"use client"

import Template from "../../../../Components/Template/Template";
import VideoPlayer from "../../../../Components/VideoPlayer/VideoPlayer";
import { redirect, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import useSWR from "swr";
import axios from "axios";

const Page=()=>{
    const {data:session} = useSession();
    //check if user is login
    if(!session)
    {
        return redirect("/login")
    }
    const getData= async(url)=>{
        try{
            const response = axios({
                method: "get",
                url
            });
            return response.data.data;
        }
        catch(error)
        {
            return redirect("/plans")
        }
    }
    const {data:userPlan,error: userError} = useSWR(
        session ? `/api/purchase/${session.user.email}`: null,
        session ? getData : null
    );
    //ADMIN gets access to everything without purchase
    if(session.user.role !=="ADMIN")
    {
        //check if user purchased a plan or not
    if(!userPlan)
    {
        return redirect("/plans")
    }
    //check plan validity
    const {diff} = userPlan;
    if (diff < 0)
    {
        return redirect("/plans")
    }
    }
    const params = useSearchParams();
    const title= params.get("title")
    const desc= params.get("desc")
    const duration= params.get("duration")
    const thumbnail= params.get("thumbnail")
    const category= params.get("category")
    const data={
        title,
        desc,
        duration,
        thumbnail,
        category
    }
    // console.log(data)
const design=(
<>
<Template>
    <div className="bg-black">
        <div className="sm:w-9/12 mx-auto">
{
    data.title ? <VideoPlayer params={data}/> : null
}
<div className="bg-white p-8">
<h2 className="text-2xl font-bold">
    {data.title && data.title}
</h2>
<p className="font-bold">
    Duration : {data.duration && (data.duration / 60).toFixed(2)} Min
</p>
<p>{data.desc && data.desc}</p>
<h2 className="text-2xl font-bold">Category</h2>
<p>{data.category && data.category}</p>
</div>
        </div>
    </div>
</Template>
</>
)
return design;
}

export default Page;