"use client";
import {signIn, signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";

export const GoogleLoginButton = () => {
    return <Button onClick={() => signIn('google',{callbackUrl:"/"})}>Google</Button>
}
export const LogoutButton = () => {
    return <Button onClick={() => signOut({callbackUrl:"/api/auth/signin"})}>Logout</Button>
}