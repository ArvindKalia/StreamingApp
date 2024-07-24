"use client"
import Template from "../../Components/Template/Template";
import Homepage from "../../Components/Homepage/Homepage";

//dont use swr as this page with be used for SEO, instead use below
const getData = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}/api/movies/latest`)
    if (!response.ok) {
      throw new Error("Failed to fetch Data !")
    }
    return response.json();
  }
  catch (error) {
    return []
  }
} //this function (getData) will be called where you want to get the data 

const Page = async () => {
  const data = await getData();
  const design = (
    <>

      <Template>
        <Homepage latestMovies={(data && data.data ? data.data : [])} />
      </Template>
    </>
  )
  return design;
}

export default Page;