"use client";
import {Button} from "@/components/ui/button";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {SettingsDropDown} from "@/components/ui/SettingsDropDown";

export const Toolbar = () => {
    const session = useSession();
    const router = useRouter();
    return (
        <div
            className={"w-full fixed top-0 h-12 bg-black/30 backdrop-blur-sm inline-flex items-center justify-end px-2"}>
            {session.data?.user ?
                <SettingsDropDown session={session.data}/>
                :
                <Button variant="outline" onClick={() => router.push('/auth/signin')}>Connexion</Button>
            }
        </div>
    )
}