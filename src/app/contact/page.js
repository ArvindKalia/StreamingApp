"use client"
import ContactForm from "../../../Components/ContactForm/ContactForm";
import Template from "../../../Components/Template/Template";

const Page=()=>{
    const design = (
<>
<Template>
<div className="p-5 sm:p-16">
    <div className="w-full sm:w-6/12 mx-auto border p-3 sm:p-8 shadow-lg rounded-lg">
    <h1 className="font-bold text-5xl mb-5">Contact us</h1>
    <ContactForm />
    </div>
</div>
</Template>
</>
    )
    return design;
}
export default Page;