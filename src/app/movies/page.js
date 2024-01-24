"use client"

import Template from "../../../Components/Template/Template";
import Videos from "../../../Components/Videos/Videos";
//dont use swr as this page with be used for SEO, instead use below
const getData= async()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/movies/active`)
    if(!response.ok)
    {
        throw new Error("Failed to fetch Data !")
    }
    return response.json(); 
} //this function (getData) will be called where you want to get the data 
const Page=async()=>{
    const data= await getData();
const design=(
<>
<Template>
<Videos videos={data && data.data}/>
</Template>
</>
)
return design;
}

export default Page;