"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CharacterDisplay} from "@/components/ui/CharacterDisplay";
import {useEffect, useState} from "react";
import {PackageOpen} from "lucide-react";
import {Loader} from "@/components/ui/Loader";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {BorderBeam} from "@/components/ui/border-beam";

export default function CharactersPage() {
    const [characters, setCharacters] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchCharacter = async () => {
            await fetch(`/api/character/all`).then(async (res) => {
                const data = await res.json();
                setCharacters(data);
            }).finally(
                () => setLoading(false)
            )
        };
        fetchCharacter();
    }, []);

    return (
        <div className="flex flex-col gap-8 items-center flex-1">
            {characters.length > 0 ?
                <>
                    <Button variant="outline" asChild>
                        <Link href="/offers/editor/new" className="mt-8">
                            Ajouter une offre
                        </Link>
                    </Button>
                    <div
                        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                        {characters.map((character, index) => (
                            <Link href={`/offers/editor/${character.id}`} key={index}>
                               <Card className={"bg-transparent backdrop-blur-[2px]"}>
                                   <CardContent>
                                       <CardHeader>
                                           {character.pseudo}
                                       </CardHeader>
                                   </CardContent>
                               </Card>
                            </Link>
                        ))}
                    </div>
                </>
                : (
                    <div className={"flex flex-1 items-center"}>
                        <div className={"flex flex-col flex-1 justify-center items-center"}>
                            {loading ?
                                <Loader size={64}/>
                                :
                                <>
                                    <PackageOpen size={64}/>
                                    <span className="text-xl">Aucune offre trouvée</span>
                                    <Button variant="outline" asChild>
                                        <Link href="/offers/editor/new" className="mt-8">
                                            Ajouter une offre
                                        </Link>
                                    </Button>
                                </>
                            }
                        </div>
                    </div>
                )}
        </div>
    );
}
