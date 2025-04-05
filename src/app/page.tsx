"use client";
import Button from "@/components/Button";
import { HStack } from "@/components/HStack";
import Image from "next/image";
import { VStack } from "@/components/VStack";
import Card from "@/components/Card";
import { InputField } from "@/components/InputField";
import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";
import { Layout } from "@/components/ui/Layout";
import { Text } from "@/components/Text";
import Hero from "@/components/Hero";
import { FaCalendarAlt, FaChair, FaTv, FaWifi } from "react-icons/fa";
import { DestaqueCard } from "@/components/DestaqueCard";

export default function Home() {
  return (
    <Layout>
      <Hero
        className="mt-8 mb-15 rounded-2xl items-start"
        height="384px"
        backgroundImage={require("@/assets/conference-room.png")}
        backgroundAlt="Background image"
      >
        <VStack className="w-full">
          <HStack gap={2}>
            <Text className="text-[48px] text-[#FFFFFF] font-family-heading font-bold">
              Salas de Reunião{" "}
            </Text>
            <Text className="text-[48px] text-content-primary font-family-heading font-bold">
              Premium
            </Text>
          </HStack>
          <Text className="text-[20px] w-1/3 text-content-ternary font-family-heading">
            Espaços elegantes e funcionais para suas reuniões corporativas mais
            importantes.
          </Text>
          <Button
            title="Reservar Agora"
            className="mt-8 text-[20px]"
            size="lg"
          />
        </VStack>
      </Hero>
      <Text className="text-center text-[30px] text-content-primary font-family-heading font-bold mb-8">
        Nossos Diferenciais
      </Text>

      <HStack className="w-full justify-between mb-25">
        <Card className="w-1/5 h-[280] bg-[#2A2A2A] justify-start items-center px-5">
          <FaCalendarAlt
            className="text-[#E5D3B3] text-[48px] mt-13"
            size={30}
          />
          <Text className="text-[20px] text-content-primary font-family-heading mt-2 mb-2">
            Reserva Simplificada
          </Text>
          <Text className="text-wrap text-center text-[16px] text-content-ternary font-family-heading">
            Sistema intuitivo para reservar sua sala preferida em poucos
            cliques.
          </Text>
        </Card>
        <Card className="w-1/5 h-[280] bg-[#2A2A2A] justify-start items-center px-5">
          <FaChair className="text-[#E5D3B3] text-[48px] mt-13" size={30} />
          <Text className="text-[20px] text-content-primary font-family-heading mt-2 mb-2">
            Conforto Premium
          </Text>
          <Text className="text-wrap text-center text-[16px] text-content-ternary font-family-heading">
            Mobiliário ergonômico e ambiente climatizado para o máximo conforto.
          </Text>
        </Card>
        <Card className="w-1/5 h-[280] bg-[#2A2A2A] justify-start items-center px-5">
          <FaTv className="text-[#E5D3B3] text-[48px] mt-13" size={30} />
          <Text className="text-[20px] text-content-primary font-family-heading mt-2 mb-2">
            Tecnologia Avançada
          </Text>
          <Text className="text-wrap text-center text-[16px] text-content-ternary font-family-heading">
            Equipamentos modernos com suporte a apresentações em alta definição.
          </Text>
        </Card>
        <Card className="w-1/5 h-[280] bg-[#2A2A2A] justify-start items-center px-5">
          <FaWifi className="text-[#E5D3B3] text-[48px] mt-13" size={30} />
          <Text className="text-[20px] text-center text-content-primary font-family-heading mt-2 mb-2">
            Internet de Alta Velocidade
          </Text>
          <Text className="text-wrap text-center text-[16px] text-content-ternary font-family-heading">
            Conexão rápida e estável para suas conferências virtuais.
          </Text>
        </Card>
      </HStack>

      <HStack className="w-full justify-between items-end mb-16">
        <Text className="text-[30px] text-content-primary font-family-heading font-bold">
          Salas em Destaque
        </Text>
        <Text className="text-[16px] text-content-primary font-family-heading cursor-pointer">
          Ver todas
        </Text>
      </HStack>

      <HStack className="w-full justify-around mb-16">
        <DestaqueCard
          backgroundImage={require("@/assets/destaque1.png")}
          backgroundAlt="Sala em Destaque"
          className="w-1/4"
          title="Sala Prime"
          description="Espaço amplo e confortável ideal para reuniões executivas e apresentações de grande porte. Equipada com TV para projeções, sistema de ar condicionado e conexão Wifi de alta velocidade para atender equipes completas."
          badges={["14 pessoas", "TV", "Ar Condicionado", "Wifi"]}
        />
        <DestaqueCard
          backgroundImage={require("@/assets/destaque2.png")}
          backgroundAlt="Sala em Destaque"
          className="w-1/4"
          title="Sala Nano"
          description="Ambiente compacto e funcional perfeito para reuniões rápidas e sessões de brainstorming. Conta com TV para compartilhamento de conteúdo, ar condicionado e Wifi de alta velocidade, garantindo conforto e produtividade."
          badges={["4 pessoas", "TV", "Ar Condicionado", "Wifi"]}
        />
        <DestaqueCard
          backgroundImage={require("@/assets/destaque3.png")}
          backgroundAlt="Sala em Destaque"
          className="w-1/4"
          title="Sala Sigma"
          description="Sala versátil de tamanho médio para encontros colaborativos e discussões em grupo. Oferece ambiente climatizado com ar condicionado e conexão Wifi estável, proporcionando o cenário ideal para reuniões estratégicas."
          badges={["8 pessoas", "Ar Condicionado", "Wifi"]}
        />
      </HStack>
    </Layout>
  );
}
