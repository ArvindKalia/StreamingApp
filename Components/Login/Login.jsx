"use client"

import { Button, Card, FormDesign } from "../../Tailwind";
import Loader from "../Loader/Loader";
import Style from "./Login.module.css"
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const Login = () => {
    const [error, setError] = useState(false)
    const session = useSession();
    if (session.status === "loading") {
        return <Loader />
    }
    if (session.status === "authenticated") {
        return redirect("/")
    }
    const fields=[
        {
            component: "input",
            props: {
                name: "email",
                type: "email",
                placeholder: "Email",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                label: "Email",
            }
        },
        {
            component: "input",
            props: {
                name: "password",
                type: "password",
                placeholder: "Password",
                className: "bg-gray-100 rounded-sm border-0 p-3",
                label: "Password",
            }
        }
    ]

    const onSubmit= async(values)=>{
        const {ok} = await signIn(
            "credentials",
            {...values,redirect:false}
            );
            if(ok){
                redirect("/");
            }else
            {
                setError(true);
                setTimeout(()=>setError(false),3000)
            }
    }

    const design = (
        <>
            <div className={`min-h-screen ${Style.main}`}>
                <div className={`flex items-center justify-center min-h-screen ${Style.opacity}`}>
                    <div className="w-3/12">
                        <Card>
                            <div className="flex flex-col gap-4">
                                {
                                    error ?
                                <Card className="bg-red-500 text-red"><h1>Sign in failed. Check the details you provided are correct</h1></Card>
                                    : null
                                }
                                <FormDesign 
                                fields={fields}
                                onSubmit={onSubmit}
                                />
                                <hr />
                                <Button
                                    onClick={() => signIn('google')}
                                    className="flex items-center gap-3" theme="warning">
                                    <i className="fa fa-google"
                                        style={{ fontSize: "30px" }}
                                    ></i>
                                    Signin with Google
                                </Button>
                                <Button
                                    onClick={() => signIn('facebook')}
                                    className="flex items-center gap-3" theme="secondary">
                                    <i className="fa fa-facebook"
                                        style={{ fontSize: "30px" }}
                                    ></i>
                                    Signin with Facebook
                                </Button>
                                <Button
                                    onClick={() => signIn('github')}
                                    className="flex items-center gap-3" theme="info">
                                    <i className="fa fa-github"
                                        style={{ fontSize: "30px" }}
                                    ></i>
                                    Signin with Github
                                </Button>
                                <Link 
                className="text-end text-blue-500"
                href="/register">
                Visit Signup Page !
                </Link>
                            </div>
                        </Card>
                    </div>

                </div>

            </div>
        </>
    )
    return design;
}
export default Login;