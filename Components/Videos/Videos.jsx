import { Button } from "../../Tailwind";
import Link from "next/link";
//dont use swr as this page with be used for SEO, instead use below
const getData= async()=>{
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/movies/active`)
    if(!response.ok)
    {
        throw new Error("Failed to fetch Data !")
    }
    return response.json(); 
} //this function (getData) will be called where you want to get the data 
const Videos= async()=>{
    const data= await getData();
    const design=(
<>

<div className="p-8 sm:p-16">
    <div className="grid sm:grid-cols-4 gap-8">
    { // assigned parenthesis(), instead of {} to assign directly
        data && data.data.map((item,index)=>(      
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
            
                <Link href={'/videos/'+item.title.toLowerCase().split(" ").join("-")} passHref>                                 
                
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