"use client";

import { Button, Card, FormDesign } from "../../Tailwind";
import Loader from "../Loader/Loader";
import Style from "../Login/Login.module.css";
import { redirect } from "next/navigation";
import { useState,useEffect } from "react";
import Link from "next/link";
import { useDispatch,useSelector } from "react-redux";
import signup from "./Register.action";

const Login = () => {
  const [error, setError] = useState(false);

  const dispatch=useDispatch();
  const RegisterReducer=useSelector(response=>response.RegisterReducer);
 
  const fields = [
    {
      component: "input",
      props: {
        name: "name",
        type: "text",
        placeholder: "Fullname",
        className: "bg-gray-100 rounded-sm border-0 p-3",
        label: "Fullname",
      },
    },
    {
      component: "input",
      props: {
        name: "email",
        type: "email",
        placeholder: "Email",
        className: "bg-gray-100 rounded-sm border-0 p-3",
        label: "Email",
      },
    },
    {
      component: "input",
      props: {
        name: "password",
        type: "password",
        placeholder: "Password",
        className: "bg-gray-100 rounded-sm border-0 p-3",
        label: "Password",
      },
    },
  ];

  useEffect(()=>{
    if(RegisterReducer.true)
    {
      return redirect("/plans");
    }
    if(RegisterReducer.error)
    {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 3000);
    }
  },[RegisterReducer])

  const onSubmit = async (values) => {
    dispatch(signup(values));
  };

  const design = (
    <>
      <div className={`min-h-screen ${Style.main}`}>
        <div
          className={`flex items-center justify-center min-h-screen ${Style.opacity}`}
        >
          <div className="w-3/12">
            <Card>
              <div className="flex flex-col gap-4">
                {error ? (
                  <Card 
                  className="text-red-500">
                    <h1>
                      Signup failed. Please try again later.
                    </h1>
                  </Card>
                ) : null}
                <h1 className="text-2xl font-bold">Register</h1>
                <FormDesign 
                disabled={RegisterReducer.loading}
                fields={fields} 
                onSubmit={onSubmit} />
                <Link 
                className="text-end text-blue-500"
                href="/login">
                Visit Login Page !
                </Link>
                
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
  return design;
};
export default Login;
