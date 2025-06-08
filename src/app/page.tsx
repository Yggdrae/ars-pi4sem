"use client";
import { Layout } from "@/components/ui/Layout";
import Hero from "@/components/Hero";
import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { DestaqueCard } from "@/components/DestaqueCard";
import { DiferenciaisSection } from "@/components/DiferenciaisSection";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSalas } from "@/hooks/useSalas";
import { ISala } from "@/interfaces/ISala";

export default function Home() {
  const { getDestaques } = useSalas();
  const [destaques, setDestaques] = useState<ISala[]>([]);

  useEffect(() => {
    const fetchDestaques = async () => {
      const destaques = await getDestaques();
      setDestaques(destaques.sort((a: ISala, b: ISala) => a.numero - b.numero));
    };
    fetchDestaques();
  }, [])
  return (
    <Layout>
      <Hero
        className="mb-16 rounded-2xl items-start"
        height="384px"
        backgroundImage={require("@/assets/conference-room.png")}
        backgroundAlt="Imagem de sala de reunião"
      >
        <VStack className="w-full max-w-5xl">
          <HStack gap={2} className="flex-wrap">
            <Text className="text-[32px] sm:text-[48px] text-[#FFFFFF] font-family-heading font-bold">
              Salas de Reunião
            </Text>
            <Text className="text-[32px] sm:text-[48px] text-content-primary font-family-heading font-bold">
              Premium
            </Text>
          </HStack>
          <Text className="text-[16px] sm:text-[20px] sm:w-2/3 text-content-ternary font-family-heading">
            Espaços elegantes e funcionais para suas reuniões corporativas mais importantes.
          </Text>
          <div className="mt-8 w-fit">
            <Link href="/salas">
              <Button
                title="Reservar Agora"
                className="text-[16px] sm:text-[18px]"
                size="md"
              />
            </Link>
          </div>
        </VStack>
      </Hero>

      <DiferenciaisSection />

      <HStack className="w-full justify-between items-center mb-10 px-4 sm:px-0 flex-wrap gap-2">
        <Text className="text-[24px] sm:text-[30px] text-content-primary font-family-heading font-bold">
          Salas em Destaque
        </Text>
        <Link href="/salas">
          <Text className="text-[14px] sm:text-[16px] text-content-primary font-family-heading cursor-pointer">
            Ver todas
          </Text>
        </Link>
      </HStack>

      <HStack className="w-full justify-center flex-wrap gap-8">
        {destaques && destaques.map((destaque: ISala) => {
          return (
            <DestaqueCard
              key={destaque.numero}
              backgroundImage={destaque.salasImagens[0].imagemBase64 ? destaque.salasImagens[0].imagemBase64 : require("@/assets/conference-room.png")}
              backgroundAlt={`Imagem da sala ${destaque.numero}`}
              className="w-full sm:w-[48%] lg:w-[30%]"
              title={`Sala ${destaque.numero}`}
              badges={destaque.salasRecursos}
              capacity={destaque.capacidade}
              hourValue={destaque.valorHora}
            />
          )
        })}

      </HStack>
    </Layout>
  );
}