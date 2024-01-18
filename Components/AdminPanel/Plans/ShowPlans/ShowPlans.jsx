"use client"
import {
    Card,
    IconButton,
    Dialog,
    FormDesign
} from "../../../../Tailwind";
import useSWR from "swr";
import axios from "axios";
import { useState, useEffect } from "react";
import Loader from "../../../Loader/Loader";
import { useDispatch } from "react-redux";

const ShowPlans = () => {

    const [formData, setFormData] = useState({
        _id:'',
        title:'',
        desc:'',
        emi:'',
        amount:''

    })

    const dispatch = useDispatch();
    const getData = async (url) => {
        try {
            const response = await axios({
                method: "get",
                url
            });
            return response.data.data;
        }
        catch (error) {
            return error.response.data
        }
    }
    const { data, error } = useSWR(
        "/api/plan",
         getData,
         {refreshInterval : 5000}
         )

         const fields = [
            {
                component: "input",
                props: {
                    name: "_id",
                    className: "bg-gray-100 rounded-sm border-0 p-3",
                    type: "hidden"
                }
            },
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

    useEffect(() => {
        console.log(data, error)
    }, [data, error]);

    const trash= async(id)=>{
        await axios({
            method:"delete",
            url: "/api/plan/"+id
        })
    }

    const edit=(item)=>{
        dispatch({
            type: "OPEN_DIALOG"
        });
        setFormData(item)
    }

    const update=async (values,{resetForm})=>{
        const {_id}=values
        await axios({
            method:"put",
            url: "/api/plan/"+_id,
            data : values
        });
        resetForm();
        dispatch({
            type: "CLOSE_DIALOG"
        })
    }

    const AllPlans = ({item}) => {
        const plan = (
            <>
                <Card>
                    <h1 className="text-2xl font-bold">
                        {item.title}
                    </h1>
                    <p className="text-gray-400">
                        {item.desc}
                    </p>
                    <div className="flex-flex-col gap-3 my-2">
                        <h1 className="text-6xl font-bold">
                            {item.amount}
                        </h1>
                        <p>
                            {item.emi}/emi
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <IconButton 
                        theme='secondary'
                        onClick={()=>edit(item)}
                        >edit</IconButton>
                        <IconButton 
                        theme='error'
                        onClick={()=>trash(item._id)}
                        >delete</IconButton>
                    </div>
                </Card>
            </>
        )
        return plan
    }
    const design = (
        <>
            <div className="grid sm:grid-cols-3 gap-4">
           {
            data===undefined? <Loader /> : null
           }
           {
                data && data.map((item,index)=>{
                    return <AllPlans key={index} item={item}/>
                })
            }
            <Dialog title="Edit & Save">
                <FormDesign
                fields={fields}
                formData={formData}
                btnType="edit"
                onSubmit={update}
                />
            </Dialog>

            </div>
        </>
    )
    return design;
}
export default ShowPlans;