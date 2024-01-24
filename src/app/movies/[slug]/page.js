"use client"

import Template from "../../../../Components/Template/Template";
import VideoPlayer from "../../../../Components/VideoPlayer/VideoPlayer";
import { useSearchParams } from "next/navigation";

const Page=()=>{
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
    console.log(data)
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