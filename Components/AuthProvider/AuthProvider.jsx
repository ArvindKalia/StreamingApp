"use client"
import store from "../store";
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";

const AuthProvider=({children})=>{
    return (
        <>
        <SessionProvider>
        <Provider store={store}>{children}</Provider>
        </SessionProvider>
        </>
    );
}

export default AuthProvider;