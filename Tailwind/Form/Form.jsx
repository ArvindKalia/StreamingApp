import {
    Formik,
    Form,
} from "formik";
import * as yup from "yup";
import "./Form.css"
const FormDesign = ({children,...rest}) => {
    const schema= yup.object({
        fullname: yup.string().required("This field is required !"),
        email: yup.string().required("This field is required !").email("Not valid Email"),
        password:yup.string().required("This field is required !")
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
                               <button
                               className="p-3 bg-red-500 text-white mt-4"
                               >Submit</button>
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