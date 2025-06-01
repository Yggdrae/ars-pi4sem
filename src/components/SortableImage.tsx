// components/SortableImage.tsx
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

interface SortableImageProps {
    id: string | number;
    src: string;
    onRemove: () => void;
}

export const SortableImage = ({ id, src, onRemove }: SortableImageProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "manipulation",
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="relative group"
        >
            <Image
                src={src}
                width={100}
                height={100}
                alt="Imagem da sala"
                className="rounded cursor-move"
            />
            <button
                onClick={onRemove}
                className="absolute top-1 right-1 text-red-500 bg-black bg-opacity-50 rounded px-1 hidden group-hover:block"
            >
                ×
            </button>
        </div>
    );
};
