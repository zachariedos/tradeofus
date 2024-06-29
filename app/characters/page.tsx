"use client";

import {Button} from "@/components/ui/button";
import Link from "next/link";
import {CharacterDisplay} from "@/components/ui/CharacterDisplay";
import {useEffect, useState} from "react";
import {PackageOpen} from "lucide-react";

export default function CharactersPage() {
    const [characters, setCharacters] = useState<any[]>([]);
    useEffect(() => {
        const fetchCharacter = async () => {
            await fetch(`/api/character/all`).then(async (res) => {
                const data = await res.json();
                console.log(data)
                setCharacters(data);
            });
        };
        fetchCharacter();
    }, []);

    return (
        <div className="flex flex-col gap-8 items-center flex-1">
            {characters.length > 0 ?
                <>
                    <Button variant="outline" asChild>
                        <Link href="/characters/editor/new" className="mt-8">
                            Ajouter un personnage
                        </Link>
                    </Button>
                    <div
                        className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                        {characters.map((character, index) => (
                            <Link href={`/characters/editor/${character.id}`} key={index}>
                                <CharacterDisplay
                                    gender={character.gender}
                                    pseudo={character.pseudo}
                                    class={character.classe.slug}
                                    clickableCharacter
                                />
                            </Link>
                        ))}
                    </div>
                </>
                : (
                    <div className={"flex flex-1 items-center"}>
                        <div className={"flex flex-col flex-1 justify-center items-center"}>
                            <PackageOpen size={64}/>
                            <span className="text-xl">Aucun personnage trouvé</span>
                            <Button variant="outline" asChild>
                                <Link href="/characters/editor/new" className="mt-8">
                                    Ajouter un personnage
                                </Link>
                            </Button>
                        </div>
                    </div>
                )}
        </div>
    );
}
