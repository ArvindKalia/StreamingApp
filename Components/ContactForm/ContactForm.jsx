import { 
    FormDesign,
    Input
} from "../../Tailwind";
const ContactForm= ()=>{
    const design=(
        <>
        <FormDesign>
       <div className="flex flex-col gap-3 mb-3">
       <Input
        name="fullname"
        placeholder="Name"
        />
        <Input
        name="email"
        type="email"
        placeholder="Email"
        />
        <Input
        name="mobile"
        type="number"
        placeholder="Mobile"
        />
        <Input
        name="message"
        textarea
        placeholder="Message"
        />
       </div>
        </FormDesign>
        </>
    )
    return design;
}
export default ContactForm