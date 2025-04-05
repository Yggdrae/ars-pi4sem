import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Button from "./Button";

interface DestaqueCardProps {
  backgroundImage: string | StaticImageData;
  backgroundAlt: string;
  title: string;
  description: string;
  badges?: string[];
  children?: ReactNode;
  imagePosition?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  className?: string;
  buttonText?: string;
}

export const DestaqueCard = ({
  backgroundImage,
  backgroundAlt,
  title,
  description,
  badges = [],
  imagePosition = "center",
  objectFit = "cover",
  children,
  className,
  buttonText = "Reservar",
}: DestaqueCardProps) => {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-2xl w-full max-w-md bg-[#2A2A2A] text-[#FFFFFF] border border-content-primary/20 ${className}`}
    >
      {/* Container da imagem */}
      <div className="relative w-full h-64">
        <Image
          src={backgroundImage}
          alt={backgroundAlt}
          fill
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN88P/LfwAJNAO5XLPYgwAAAABJRU5ErkJggg=="
          style={{
            objectFit,
            objectPosition: imagePosition,
          }}
        />
      </div>

      {/* Conteúdo do card */}
      <div className="flex flex-col flex-grow p-6 gap-4">
        {/* Título */}
        <h2 className="text-2xl font-semibold">{title}</h2>

        {/* Descrição */}
        <p className="text-base text-gray-200">{description}</p>

        {/* Badges */}
        <div className="flex flex-wrap gap-2 mt-2">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-content-secondary text-sm rounded-lg"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Componentes filhos adicionais se houver */}
        {children}

        {/* Espaçador que empurra o botão para baixo */}
        <div className="flex-grow"></div>

        {/* Botão */}
        <Button
          title={buttonText}
          className="mt-4 text-[16px] w-full bg-content-primary text-black hover:bg-beige-200"
          size="lg"
        />
      </div>
    </div>
  );
};