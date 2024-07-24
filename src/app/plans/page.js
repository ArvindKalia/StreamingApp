"use client"
import Template from "../../../Components/Template/Template";
import Plans from "../../../Components/Plans/Plans";

const getData = async () => {
    try{
        const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/plan`)
    if (!response.ok) {
        throw new Error('Failed to Fetch Data')
    }
    return response.json();
    }
    catch(error){
        return []
    }
}

const Page= async()=>{
    const data = await getData();
const design=(
    <>
    <Template>
    <Plans plans={(data&& data.data)? data.data : []}/>
    </Template>
    </>
)
return design;
}
export default Page;