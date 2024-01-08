import { 
    FormDesign,
    Input
} from "../../Tailwind";
const ContactForm= ()=>{
    const fields=[
        {
            component : "input",
            props : {
                name: "fullname",
                placeholder: "Name",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                width: "full"
            }
        },
        {
            component : "input",
            props : {
                name: "email",
                placeholder: "Email",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                width: "full",
                type: "email"
            }
        },
        {
            component : "input",
            props : {
                name: "mobile",
                placeholder: "Mobile",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                width: "full",
                type: "number"
            }
        },
        {
            component : "input",
            props : {
                name: "message",
                placeholder: "Message",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                width: "full",
                textarea: true
            }
        }
    ]
    const design=(
        <>
        <FormDesign fields={fields} />
        </>
    )
    return design;
}
export default ContactForm