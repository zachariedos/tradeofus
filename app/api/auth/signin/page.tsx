"use client";

import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "@/components/ui/card"
import {DiscordLoginButton, GoogleLoginButton} from "@/components/ui/AuthButton";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {toast} from "react-toastify";
import {useSearchParams} from "next/navigation";

export default function SignIn() {
    const searchParams = useSearchParams();
    useEffect(() => {
        if (searchParams.get("error") == "OAuthAccountNotLinked") {
            toast.error("Un compte existe déjà avec cette adresse email. Veuillez vous connecter avec le bon fournisseur de connexion.")
        }
    }, [searchParams])

    return (
        <div className={"flex flex-col gap-2 items-center justify-center flex-1"}>
            <div className="space-y-4">
                <GoogleLoginButton/>
            </div>
            <div className="space-y-4">
                <DiscordLoginButton/>
            </div>
        </div>
    )
}