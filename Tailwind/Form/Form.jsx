import {
    Formik,
    Form,
} from "formik";
import * as yup from "yup";
import "./Form.css"
import { Button, Input, UploadInput, Select } from "..";
const FormDesign = ({fields,grid=1,gap=4,disabled=false,...rest}) => {
    const schema= {
        fullname: yup.string().required("This field is required !"),
        name: yup.string().required("This field is required !"),
        emi: yup.string().required("This field is required !"),
        amount: yup.string().required("This field is required !"),
        email: yup.string().required("This field is required !").email("Not valid Email"),
        password:yup.string().required("This field is required !"),
        mobile:yup.string().required("This field is required !"),
        message:yup.string().required("This field is required !"),
        title:yup.string().required("This field is required !"),
        desc:yup.string().required("This field is required !"),
        duration:yup.string().required("This field is required !"),
        staring:yup.string().required("This field is required !"),
        thumbnail:yup.string().required("This field is required !"),
        video:yup.string().required("This field is required !"),
        category:yup.string().required("This field is required !"),
        tags:yup.string().required("This field is required !"),
    }
    const defaultValues={};

    const validation={}

    const Fields= ({formik})=>{
        const allFields= fields.map((item,index)=>{
            const {component,props}= item;
            switch(component)
            {
                case "input" :return <Input key={index} {...props} />
                case "upload" :return (
                <UploadInput 
                formik={formik}
                key={index} 
                {...props} 
                />
                )
                case "select" :return <Select key={index} {...props} />
                default :return null;
            }
            
        });
        return allFields;
    }

    fields.map((item,index)=>{
        const {props} = item;
        const {name} = props;
        defaultValues[name] = "";
        validation[name]=schema[name];
    })

    const design = (
        <>
            <Formik 
            {...rest}
            initialValues={defaultValues}
            validationSchema={yup.object(validation)}
            >
                {
                    (formik) => {
                        return (
                            <>
                               <Form className={`grid gap-${gap}`}>
                               <div className={`grid grid-cols-${grid} gap-${gap}`}> 
                               <Fields
                               formik={formik}
                               />
                               
                               </div>
                               <Button
                               type="submit"
                               theme="error"
                               disabled={disabled}
                               >Submit</Button>
                               </Form>
                            </>
                        )
                    }
                }
            </Formik>
        </>
    )
    return design;
}

export default FormDesign;