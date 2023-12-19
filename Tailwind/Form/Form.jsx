import {
    Formik,
    Form,
} from "formik";
import * as yup from "yup";
import "./Form.css"
import { Button } from "..";
const FormDesign = ({children,...rest}) => {
    const schema= yup.object({
        fullname: yup.string().required("This field is required !"),
        email: yup.string().required("This field is required !").email("Not valid Email"),
        password:yup.string().required("This field is required !"),
        mobile:yup.string().required("This field is required !"),
        message:yup.string().required("This field is required !")
    })
    const defaultValues={
        fullname:"",
        email:"",
        password:""
    }
    const design = (
        <>
            <Formik
            initialValues={defaultValues}
            validationSchema={schema}
            {...rest}
            >
                {
                    (formik) => {
                        return (
                            <>
                               <Form>
                               {children}
                               <Button
                               theme="error"
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