"use client";
import { Layout } from "@/components/ui/Layout";
import Hero from "@/components/Hero";
import { VStack } from "@/components/VStack";
import { HStack } from "@/components/HStack";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { DestaqueCard } from "@/components/DestaqueCard";
import { DiferenciaisSection } from "@/components/DiferenciaisSection";

export default function Home() {
  return (
    <Layout>
      <Hero
        className="mt-8 mb-16 rounded-2xl items-start"
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
            <Button
              title="Reservar Agora"
              className="text-[16px] sm:text-[18px]"
              size="md"
            />
          </div>
        </VStack>
      </Hero>

      <DiferenciaisSection />

      <HStack className="w-full justify-between items-center mb-10 px-4 sm:px-0 flex-wrap gap-2">
        <Text className="text-[24px] sm:text-[30px] text-content-primary font-family-heading font-bold">
          Salas em Destaque
        </Text>
        <Text className="text-[14px] sm:text-[16px] text-content-primary font-family-heading cursor-pointer">
          Ver todas
        </Text>
      </HStack>

      <HStack className="w-full justify-center flex-wrap gap-8 mb-24">
        <DestaqueCard
          backgroundImage={require("@/assets/destaque1.png")}
          backgroundAlt="Sala Prime"
          className="w-full sm:w-[48%] lg:w-[30%]"
          title="Sala Prime"
          description="Espaço amplo e confortável ideal para reuniões executivas e apresentações de grande porte. Equipada com TV para projeções, sistema de ar condicionado e conexão Wifi de alta velocidade para atender equipes completas."
          badges={["14 pessoas", "TV", "Ar Condicionado", "Wifi"]}
        />
        <DestaqueCard
          backgroundImage={require("@/assets/destaque2.png")}
          backgroundAlt="Sala Nano"
          className="w-full sm:w-[48%] lg:w-[30%]"
          title="Sala Nano"
          description="Ambiente compacto e funcional perfeito para reuniões rápidas e sessões de brainstorming. Conta com TV para compartilhamento de conteúdo, ar condicionado e Wifi de alta velocidade, garantindo conforto e produtividade."
          badges={["4 pessoas", "TV", "Ar Condicionado", "Wifi"]}
        />
        <DestaqueCard
          backgroundImage={require("@/assets/destaque3.png")}
          backgroundAlt="Sala Sigma"
          className="w-full sm:w-[48%] lg:w-[30%]"
          title="Sala Sigma"
          description="Sala versátil de tamanho médio para encontros colaborativos e discussões em grupo. Oferece ambiente climatizado com ar condicionado e conexão Wifi estável, proporcionando o cenário ideal para reuniões estratégicas."
          badges={["8 pessoas", "Ar Condicionado", "Wifi"]}
        />
      </HStack>
    </Layout>
  );
}