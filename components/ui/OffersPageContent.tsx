"use client";

import {forwardRef, useRef, useState, useEffect} from "react";
import {AnimatedBeam} from "@/components/ui/animated-beam";
import {ItemsSelector} from "@/components/ui/ItemsSelector";
import Image from "next/image";
import {PackageOpen} from "lucide-react";
import {cn} from "@/lib/utils";
import {ColorByCharacteristic} from "@/src/lib/colorByCharacteristic";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card";
import {HoverCardArrow} from "@radix-ui/react-hover-card";

export default function OffersPageContent({characteristicList}) {
    const [item, setItem] = useState(null);
    const containerRef = useRef(null);
    const centralRef = useRef(null);
    const [indexToReverse, setIndexToReverse] = useState([]);
    const circleCount = characteristicList.length;
    const levels = 3;
    const refs = useRef(Array.from({length: circleCount}, () => useRef(null)));
    let indexCounter = 0;
    useEffect(() => {
        if (!characteristicList.length) return;

        const container = containerRef.current;
        const centralElement = centralRef.current;
        const containerRect = container.getBoundingClientRect();
        const centralRect = centralElement.getBoundingClientRect();

        const maxRadius = Math.min(containerRect.width, containerRect.height) / 3.5;
        const centralOffset = Math.max(centralRect.width, centralRect.height) / 2;

        const levelRadii = Array.from({length: levels}, (_, i) => (i + 1) * (maxRadius - centralOffset) / levels + centralOffset);

        let newIndexToReverse = [];

        refs.current.forEach((ref, index) => {
            if (ref.current) {
                const level = Math.floor(index / (circleCount / levels));
                const angle = (index % (circleCount / levels)) / (circleCount / levels) * 2 * Math.PI;

                const separationFactor = 1.6; // Adjust separation factor for spacing between circles
                const x = levelRadii[level] * Math.cos(angle) * separationFactor;
                const y = levelRadii[level] * Math.sin(angle) * separationFactor;

                ref.current.style.transform = `translate(${x}px, ${y}px)`;

                if (x > 0) {
                    newIndexToReverse.push(index);
                }
            }
        });

        setIndexToReverse(newIndexToReverse);
    }, [circleCount, levels, characteristicList]);

    useEffect(() => {
        indexCounter = 0;
    }, [item]);

    return (
        <div className={"flex flex-col  flex-1 items-center"}>
            <ItemsSelector onSelect={setItem}/>
            <div className="relative w-[80vw] h-[80vh] flex items-center justify-center" ref={containerRef}>
                <div className="relative w-full h-full flex items-center justify-center">
                    {characteristicList.map((characteristic, index) => (
                        <Circle
                            key={characteristic.id}
                            ref={refs.current[index]}
                            hidden={item?.effects?.find(effect => effect.characteristic === characteristic.id) === undefined}
                        >
                            <HoverCard openDelay={0} closeDelay={0}>
                                <HoverCardTrigger>
                                    <Image src={"https://dofusdb.fr/icons/characteristics/" + characteristic.asset + ".png"} width={40} height={40} alt={characteristic.name.fr}/>
                                </HoverCardTrigger>
                                <HoverCardContent sideOffset={5}>
                                    <div className={"flex flex-col gap-2 items-center justify-center bg-none backdrop-blur-sm"}>
                                        <span className={"flex flex-row gap-2 text-sm items-center"}>
                                        <Image className={"flex-1 size-6" } src={"https://dofusdb.fr/icons/characteristics/" + characteristic.asset + ".png"} width={20} height={20} alt={characteristic.name.fr}/>
                                        <span className={"font-semibold"}>{characteristic.name.fr}</span>
                                            </span>
                                    </div>
                                </HoverCardContent>
                            </HoverCard>
                        </Circle>

                    ))}
                    <div
                        className="absolute flex items-center justify-center z-40"
                        ref={centralRef}
                        style={{
                            left: "50%",
                            top: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <div className={"relative flex items-center justify-center size-[150px]"}>
                            {item ?
                                <Image
                                    src={item?.imgset[3].url}
                                    alt={item?.name.fr}
                                    width={200}
                                    height={200}
                                    className={"absolute z-20"}
                                />
                                :
                                <div className={"flex flex-col gap-2 items-center justify-center absolute z-20 text-center"}>
                                    <PackageOpen strokeWidth={1.25} size={60}/>
                                    Aucun objet sélectionné
                                </div>
                            }
                            <div className={" flex relative items-center justify-center z-10 "}>
                                {[...Array(20)].map((_, index) => (
                                    <div
                                        key={index}
                                        className={`absolute rounded-full `}
                                        style={{
                                            width: `${index*8}px`,
                                            height: `${index*8}px`,
                                            backdropFilter: `blur(${20 -  index}px)`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {characteristicList.map((characteristic, index) => {
                   if(item?.effects.find(effect => effect.characteristic === characteristic.id)) {
                       indexCounter++;
                       return <AnimatedBeam
                           key={index}
                           containerRef={containerRef}
                           fromRef={refs.current[index]}
                           gradientStartColor={"white"}
                           gradientStopColor={"white"}
                           toRef={centralRef}
                           duration={10}
                            delay={indexCounter}
                           reverse={!indexToReverse.includes(index)}
                           pathOpacity={0}
                       />
                   }
                })}
            </div>
        </div>
    );
}

const Circle = forwardRef<HTMLDivElement, { children: React.ReactNode,hidden?:boolean }>(({children,hidden}, ref) => {
    return (
        <div
            className={
            cn(
                "absolute size-10 z-20 hover:z-50 flex items-center justify-center",
                hidden ? "opacity-0" : "opacity-100"
            )}
            ref={ref}
        >
            {children}
        </div>
    );
});
Circle.displayName = "Circle";
