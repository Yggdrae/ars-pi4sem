import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";
import Button from "./Button";
import { VStack } from "./VStack";
import { Text } from "./Text";
import { getRecursoIcon } from "@/utils/recursosIcons";
import { HorizontalScroll } from "./HorizontalScroll";

interface DestaqueCardProps {
  backgroundImage: string | StaticImageData;
  backgroundAlt: string;
  title: string;
  floor: string;
  capacity: number;
  hourValue: number;
  resources?: { nome: string }[];
  children?: ReactNode;
  imagePosition?: string;
  objectFit?: "cover" | "contain" | "fill" | "none";
  className?: string;
  buttonText?: string;
  onClick?: () => void;
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
  onClick,
}: DestaqueCardProps) => {
  return (
    <VStack
      className={`flex flex-col w-full sm:w-[48%] lg:w-[40%] xl:w-[32%] max-h-[50vh] overflow-hidden rounded-2xl bg-[#2A2A2A] text-[#FFFFFF] border border-content-primary/20 ${className}`}
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

      <VStack className="flex flex-col flex-grow p-5 justify-between">
        <VStack gap={2}>
          <h2 className="text-xl sm:text-2xl font-semibold leading-snug">
            {title}
          </h2>

          <p className="text-[14px] lg:text-[12px] text-gray-300 leading-relaxed">
            {`${floor} andar - Capacidade para ${capacity} pessoas`}
          </p>

          <HorizontalScroll>
            {resources.map((resource, index) => (
              <div
                key={index}
                className="inline-flex items-center gap-1 px-3 py-1 bg-content-secondary text-sm rounded-lg mr-2 shrink-0"
              >
                {getRecursoIcon(resource.nome)}
                <Text>{resource.nome}</Text>
              </div>
            ))}
          </HorizontalScroll>

          {children && <div className="mt-2">{children}</div>}
        </VStack>

        <Button
          title="Reservar"
          className="mt-4 w-full bg-content-primary text-black place-self-end"
          size="lg"
          onClick={onClick}
        />
      </VStack>
    </VStack>
  );
};
