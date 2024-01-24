import axios from "axios";
import { Button } from "../../Tailwind";
import Link from "next/link";
import { useState,useEffect } from "react";

const Videos= async({videos})=>{
    const [Videos, setVideos] = useState(videos)
    const [skip, setSkip] = useState(0)

    useEffect(()=>{
        if(skip>0)
        //since we cannot make useeffect as async fn, so doing as below
        {
            const request= async ()=>{
                const response = await axios({
                    method: "get",
                    url: "/api/movies/active?skip="+skip
                });
                console.log(response.data.data)
            }
            request();
        }
    },[skip])

    useEffect(()=>{
        //unlimited scroll till total videos
        window.onscroll =()=>{
            if((window.innerHeight + window.scrollY)>= document.body.offsetHeight)
            {
                if(skip<Videos.total)
                {
                    //to avoid going beyond total videos
                    let add = skip+12
                    let result = Videos.total-add 
                    if(result<0)
                    {
                        add=add+result
                    }
                    setSkip(add)
                }
            }
        }
    },[skip])
   
    const design=(
<>

<div className="p-8 sm:p-16">
    {skip}/{Videos.total}
    <div className="grid sm:grid-cols-4 gap-8">
    { // assigned parenthesis(), instead of {} to assign directly
        Videos.movies && Videos.movies.map((item,index)=>(      
            <div className="relative" key={index}>
                <img src={process.env.NEXT_PUBLIC_CLOUDFRONT+"/"+item.thumbnail} alt={item.title} width="500px" height="500px"/>
            <div 
            style={{
                background: 'rgba(0,0,0,0.7)'
            }}
            className="absolute bottom-0 left-0 w-full p-4">
                <h1 className="text-white text-lg font-bold capitalize">
                {item.title}
                </h1>
                <p className="text-white">
                    {item.duration}
                </p>
            
                <Link href={{
                    pathname: '/videos/'+item.title.toLowerCase().split(" ").join("-"),
                    query: item
                }} passHref>                                 
                
                <Button className= "mt-2" theme="error">
                    Play Now
                    
                </Button>
                </Link>
            </div>
            </div>
        ))
    }
    </div>
</div>
</>
    )
    return design;
}
export default Videos;