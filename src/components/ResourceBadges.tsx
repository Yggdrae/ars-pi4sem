'use client'
import React, { useRef, useState, useEffect } from "react";
import { HStack } from "./HStack";
import { Text } from "./Text";
import { getRecursoIcon } from "@/utils/recursosIcons";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Props {
    resources: { nome: string }[];
}

export default function ResourceBadges({ resources }: Props) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isScrollable, setIsScrollable] = useState(false);
    const [isAtStart, setIsAtStart] = useState(true);
    const [isAtEnd, setIsAtEnd] = useState(false);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const updateScroll = () => {
            setIsAtStart(el.scrollLeft === 0);
            setIsAtEnd(el.scrollWidth - el.clientWidth - el.scrollLeft < 1);
            setIsScrollable(el.scrollWidth > el.clientWidth);
        };

        updateScroll();
        el.addEventListener("scroll", updateScroll);
        window.addEventListener("resize", updateScroll);

        return () => {
            el.removeEventListener("scroll", updateScroll);
            window.removeEventListener("resize", updateScroll);
        };
    }, []);

    return (
        <div className="relative">
            {isScrollable && !isAtStart && (
                <div className="absolute left-0 top-0 bottom-0 items-center w-8 bg-gradient-to-r from-[#121212] to-transparent z-10 pointer-events-none" >
                    <FaAngleLeft size={20} color="white" />
                </div>
            )}
            {isScrollable && !isAtEnd && (
                <div className="absolute right-0 top-0 bottom-0 items-center w-8 bg-gradient-to-l from-[#121212] to-transparent z-10 pointer-events-none" >
                    <FaAngleRight size={20} color="white" />
                </div>
            )}

            <div
                ref={scrollRef}
                className="overflow-x-auto md:overflow-x-visible flex gap-2 mt-2 px-1 scroll-smooth no-scrollbar"
                style={{ WebkitOverflowScrolling: "touch" }}
            >
                {resources.map((resource, index) => (
                    <HStack
                        key={index}
                        className="px-3 py-1 shrink-0 bg-content-secondary text-sm rounded-lg items-center gap-1 select-none"
                    >
                        {getRecursoIcon(resource.nome)}
                        <Text>{resource.nome}</Text>
                    </HStack>
                ))}
            </div>
        </div>
    );
}
