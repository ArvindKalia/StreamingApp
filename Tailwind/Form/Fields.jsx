import { 
    Field,
    ErrorMessage
} from "formik"
export const Input= ({
    name,
    type="text",
    textarea=false,
    ...rest
})=>{
    const design=(
        <>
        <Field 
        name={name} 
        type={type} 
        as={textarea?"textarea":null}
        {...rest} 
        className="border p-3"
        />
        <ErrorMessage 
        name={name} 
        component="p"
        className="text-red-500"
        />
        </>
    )
    return design;
}