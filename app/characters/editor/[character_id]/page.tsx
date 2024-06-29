"use client";

import {CharacterEditor} from "@/components/ui/CharacterEditor";
import {Button} from "@/components/ui/button";
import Link from "next/link";

interface Props {
    params: { character_id: string },
}

export default function EditorCharacterPage(props: Props) {
    return (
        <div className={"flex flex-1 h-screen flex-col"}>
            <div className={"self-start justify-self-start m-2"}>`
                <Button variant="outline" asChild>
                    <Link href={"/characters"}>
                        Retour
                    </Link>
                </Button>
            </div>
            <div className={"flex-1  justify-center items-center flex"}>
                <CharacterEditor id={props.params.character_id as number}/>
            </div>
        </div>
    )
}