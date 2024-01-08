import {
    Field,
    ErrorMessage
} from "formik"
export const Input = ({
    name,
    type = "text",
    textarea = false,
    label=null,
    ...rest
}) => {
    const design = (
        <>
            <div className={`flex flex-col col-span-${rest.width}`}>
                {
                  label ? 
                  <label className="text-sm font-bold text-left mb-2">{label}</label> 
                  : null  
                }
            <Field
                name={name}
                type={type}
                as={textarea ? "textarea" : null}
                {...rest}
            />
            <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 text-left text-sm font-bold p-0 m-0"
            />
            </div>
        </>
    )
    return design;
}

export const Select = ({ name, data,label=null, ...rest }) => {
    const design = (
        <>
           <div className={`flex flex-col col-span-${rest.width}`}>
           {
                  label ? 
                  <label className="text-sm font-bold text-left mb-2">{label}</label> 
                  : null  
                }
           <Field
                name={name}
                as="select"
                {...rest}
            >
                {
                    data.map((item, index) => {
                        return <option
                            key={index}
                            value={item.value}
                        >
                            {item.label}</option>
                    })
                }

            </Field>
            <ErrorMessage
                name={name}
                component="p"
                className="text-red-500 text-left text-sm font-bold p-0 m-0"
            />
           </div>
        </>
    )
    return design;
}

export const UploadInput = ({
    label=null,
    formik,
    ...rest
})=>{
    const handleFile =(e)=>{
        let name=e.target.name;
        let multiple= e.target.multiple;
        let files= multiple? e.target.files : e.target.files[0];
        formik.setFieldValue(name,files)
    }
    const design=(
        <>
       <div className={`flex flex-col col-span-${rest.width}`}>
        {
        label ? 
        <label className="text-sm font-bold text-left mb-2">{label}</label> 
        : null}
       <input 
       onChange={handleFile}
       type="file" 
       {...rest} />
       <ErrorMessage
                name={rest.name}
                component="p"
                className="text-red-500 text-left text-sm font-bold p-0 m-0"
            />
       </div>
        </>
    );
    return design;
}