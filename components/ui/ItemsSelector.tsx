"use client"

import * as React from "react"
import {Check, ChevronsUpDown, LoaderCircle, PackageOpen} from "lucide-react"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {useDebounce} from "@uidotdev/usehooks"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useEffect, useState} from "react"
import Image from "next/image";

const searchItemsPage = async (searchTerm) => {
    const request = await fetch(`https://api.dofusdb.fr/items?slug.fr[$search]=${searchTerm}`, {
        headers: {
            "Content-Type": "application/json",
        }
    })
    const response = await request.json()
    return response?.data || []
}

export const ItemsSelector =(props:{
    onSelect: (item: any) => void;
}) => {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [results, setResults] = useState([])
    const [isSearching, setIsSearching] = useState(false)
    const debouncedSearchTerm = useDebounce(searchTerm, 300)
    const [value, setValue] = useState<any>()

    useEffect(() => {
        const searchItems = async () => {
            setIsSearching(true)
            let searchResults = []
            if (debouncedSearchTerm) {
                searchResults = await searchItemsPage(debouncedSearchTerm)
            }
            setIsSearching(false)
            setResults(searchResults)
        }

        searchItems()
    }, [debouncedSearchTerm])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between bg-background relative z-50 backdrop-blur"
                >
                    {value
                        ?
                        <span className={"inline-flex gap-2  items-center"}>
                            <Image
                                src={value.img}
                                alt={value.name.fr}
                                width={36}
                                height={36}
                            />
                            {value.name.fr}
                        </span>
                        : "Rechercher un objet"
                    }
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="max-w-screen p-0">
                <Command shouldFilter={false}>
                    <CommandInput
                        placeholder="Rechercher un objet"
                        onValueChange={setSearchTerm}
                        value={searchTerm}
                        icon={isSearching ? <LoaderCircle className={"animate-spin"}/> : undefined}
                    />
                    {results &&
                        <CommandList>
                            <CommandEmpty className={"flex flex-col gap-2 justify-center items-center pt-4"}>
                                <PackageOpen strokeWidth={1.25}/>
                                Aucun objet trouvé
                            </CommandEmpty>
                            <CommandGroup>
                                {results.map((item) => (
                                    <CommandItem
                                        key={item.id}
                                        value={item}
                                        onSelect={() => {
                                            props.onSelect(item)
                                            setValue(item)
                                            setOpen(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value?.id === item.id ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        <span className={"inline-flex gap-2  items-center"}>
                                           <Image
                                               src={item.img}
                                               alt={item.name.fr}
                                               width={48}
                                               height={48}
                                           />
                                            {item.name.fr}
                                        </span>
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    }
                </Command>
            </PopoverContent>
        </Popover>
    )
};
