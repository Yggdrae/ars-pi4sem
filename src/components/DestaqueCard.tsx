import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Button from "./Button";
import { HorizontalScroll } from "./HorizontalScroll";
import { getRecursoIcon } from "@/utils/recursosIcons";
import { HStack } from "./HStack";
import { Text } from "./Text";

interface DestaqueCardProps {
  backgroundImage: string | StaticImageData;
  backgroundAlt: string;
  title: string;
  badges?: {
    id: number;
    recurso: {
      id: number;
      nome: string;
    };
    quantidade: number;
  }[];
  capacity?: number;
  children?: ReactNode;
  imagePosition?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  hourValue?: number;
  className?: string;
}

export const DestaqueCard = ({
  backgroundImage,
  backgroundAlt,
  title,
  badges = [],
  capacity,
  imagePosition = "center",
  objectFit = "cover",
  hourValue,
  children,
  className = "",
}: DestaqueCardProps) => {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl bg-[#2A2A2A] text-[#FFFFFF] border border-content-primary/20 ${className}`}
    >
      <div className="relative w-full h-56 sm:h-64">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/LfwAJNAO5XLPYgwAAAABJRU5ErkJggg=="
          style={{ objectFit, objectPosition: imagePosition }}
        />

        <div
          className="
            absolute top-2 right-2
            bg-content-primary text-black
            px-3 py-1 rounded-full
            text-sm font-semibold
            shadow-md
          "
        >
          {`R$ ${hourValue}/h`}
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5 gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold leading-snug">
          {title}
        </h2>

        {capacity && (
          <p className="text-sm text-content-ternary">
            Capacidade para {capacity} pessoas
          </p>
        )}

        <HorizontalScroll className="gap-2 mb-4">
          {badges.map((r, i) => (
            <HStack
              key={i}
              className="bg-[#2a2a2a] px-3 py-1 rounded-lg gap-2 items-center text-sm text-white inline-flex shrink-0"
            >
              {getRecursoIcon(r.recurso.nome)}
              <Text>{r.recurso.nome}</Text>
            </HStack>
          ))}
        </HorizontalScroll>

        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};
