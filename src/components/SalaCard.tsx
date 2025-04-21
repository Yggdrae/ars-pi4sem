import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Button from "./Button";
import { VStack } from "./VStack";
import { HStack } from "./HStack";
import { Text } from "./Text";

interface DestaqueCardProps {
  backgroundImage: string | StaticImageData;
  backgroundAlt: string;
  title: string;
  floor: number;
  capacity: number;
  hourValue: number;
  resources?: { nome: string; icon: any }[];
  children?: ReactNode;
  imagePosition?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  className?: string;
  buttonText?: string;
}

export const SalaCard = ({
  backgroundImage,
  backgroundAlt,
  title,
  floor,
  capacity,
  hourValue,
  resources = [],
  imagePosition = "center",
  objectFit = "cover",
  children,
  className = "",
}: DestaqueCardProps) => {
  return (
    <VStack
      className={`flex flex-col w-full sm:w-[48%] lg:w-[40%] xl:w-[32%] overflow-hidden rounded-2xl bg-[#2A2A2A] text-[#FFFFFF] border border-content-primary/20 ${className}`}
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
      </div>

      {/* Conteúdo */}
      <VStack className="flex flex-col flex-grow p-5">
        <h2 className="text-xl sm:text-2xl font-semibold leading-snug">{title}</h2>

        <p className="text-[14px] lg:text-[12px] text-gray-300 leading-relaxed">
          {`${floor}º andar - Capacidade para ${capacity} pessoas`}
        </p>

        <HStack className="flex flex-wrap gap-2 mt-2">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <HStack
                key={index}
                className="px-3 py-1 bg-content-secondary text-sm rounded-lg items-center gap-1"
              >
                <Icon size={14} className="text-content-ternary" />
                <Text>{resource.nome}</Text>
              </HStack>
            );
          })}
        </HStack>

        {children && <div className="mt-2">{children}</div>}

        <Button
          title="Reservar"
          className="mt-4 w-full bg-content-primary text-black"
          size="lg"
        />
      </VStack>
    </VStack>
  );
};
