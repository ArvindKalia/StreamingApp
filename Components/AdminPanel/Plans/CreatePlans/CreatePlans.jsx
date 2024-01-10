"use client"

import { Card, FormDesign, Button } from "../../../../Tailwind";
import { useDispatch, useSelector } from "react-redux";
import { create } from "../Plans.action"
import { useState,useEffect } from "react";
const CreatePlans = () => {

    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const dispatch = useDispatch();
    const PlansReducer = useSelector(response => response.PlansReducer);
    const fields = [
        {
            component: "input",
            props: {
                name: "title",
                placeholder: "Starter",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                label: "Plan Name"
            }
        },
        {
            component: "input",
            props: {
                name: "emi",
                placeholder: "monthly",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                label: "Emi Name"
            }
        },
        {
            component: "input",
            props: {
                name: "amount",
                placeholder: "2000",
                type: "number",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                label: "Amount"
            }
        },
        {
            component: "input",
            props: {
                name: "desc",
                placeholder: "Description",
                textarea: true,
                className: "bg-gray-100 rounded-sm border-0 p-3",
                label: "Description"
            }
        }
    ]
    useEffect(()=>{
        if(PlansReducer.createLoading)
        {
            setDisabled(true);
        }
        if(PlansReducer.createSuccess)
        {
            setDisabled(false)
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
            }, 3000);
        }
        if(PlansReducer.createError)
        {
            setDisabled(false)
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 3000);
        }
    },[PlansReducer])
    const onSubmit = (values,{resetForm}) => {
        dispatch(create(values,resetForm));
    }

    const design = (
        <>
            <h1>
                <Card>
                    
                       {
                        success?
                        <Card
                        className="mb-3 text-green-500">
                        <h1>
                            Create Plan Success. Please create another plan.
                        </h1>
                    </Card>
                    :null
                       }
                        {
                            error? 
                            <Card
                            className="mb-3 text-red-500">
                            <h1>
                                Create Plan failed. Please try again later.
                            </h1>
                        </Card>
                        :null
                        }
                    
                    <FormDesign
                        onSubmit={onSubmit}
                        fields={fields}
                        disabled={disabled}
                    />
                </Card>
            </h1>
        </>
    )
    return design;
}

export default CreatePlans;