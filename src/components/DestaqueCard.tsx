import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Button from "./Button";

interface DestaqueCardProps {
  backgroundImage: string | StaticImageData;
  backgroundAlt: string;
  title: string;
  badges?: string[];
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
      {/* Imagem de fundo */}
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

      {/* Conteúdo */}
      <div className="flex flex-col flex-grow p-5 gap-2">
        <h2 className="text-xl sm:text-2xl font-semibold leading-snug">{title}</h2>

        {capacity && (
          <p className="text-sm text-content-ternary">
            Capacidade para {capacity} pessoas
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-content-secondary text-sm rounded-lg"
            >
              {badge}
            </span>
          ))}
        </div>

        {children && <div className="mt-2">{children}</div>}
      </div>
    </div>
  );
};
