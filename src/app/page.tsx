'use client'
import  Button  from "@/components/Button";
import { HStack } from "@/components/HStack";
import Image from 'next/image'
import { VStack } from "@/components/VStack";
import Card from "@/components/Card";
import { InputField } from "@/components/InputField";
import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";
import { Layout } from "@/components/ui/Layout";
import { Text } from "@/components/Text";
import Hero from "@/components/Hero";
import { FaCalendarAlt, FaChair, FaTv, FaWifi } from 'react-icons/fa';

export default function Home() {

  return (
    <Layout>
      <Hero
        className="mt-8 mb-15 rounded-2xl items-start"
        height="384px"
        backgroundImage={require('@/assets/conference-room.png')}
        backgroundAlt="Background image">
        <VStack className="w-full">
          <HStack gap={2}>
            <Text className="text-[48px] text-[#FFFFFF] font-family-heading font-bold">Salas de Reunião </Text>
            <Text className="text-[48px] text-content-primary font-family-heading font-bold">Premium</Text>
          </HStack>
          <Text className="text-[20px] w-1/3 text-content-ternary font-family-heading">Espaços elegantes e funcionais para suas reuniões corporativas mais importantes.</Text>
          <Button title="Reservar Agora" className="mt-8 text-[20px]" size="lg"/>
        </VStack>
      </Hero>
      <Text className="text-center text-[30px] text-content-primary font-family-heading font-bold mb-8">Nossos Diferenciais</Text>

      <HStack className="w-full justify-between mb-33">
        <Card className="w-1/5 h-[280] bg-[#2A2A2A] justify-start items-center px-5">
          <FaCalendarAlt className="text-[#E5D3B3] text-[48px] mt-13" size={30}/>
          <Text className="text-[20px] text-content-primary font-family-heading mt-2 mb-2">Reserva Simplificada</Text>
          <Text className="text-wrap text-center text-[16px] text-content-ternary font-family-heading">Sistema intuitivo para reservar sua sala preferida em poucos cliques.</Text>
        </Card>
        <Card className="w-1/5 h-[280] bg-[#2A2A2A] justify-start items-center px-5">
          <FaChair className="text-[#E5D3B3] text-[48px] mt-13" size={30}/>
          <Text className="text-[20px] text-content-primary font-family-heading mt-2 mb-2">Conforto Premium</Text>
          <Text className="text-wrap text-center text-[16px] text-content-ternary font-family-heading">Mobiliário ergonômico e ambiente climatizado para o máximo conforto.</Text>
        </Card>
        <Card className="w-1/5 h-[280] bg-[#2A2A2A] justify-start items-center px-5">
          <FaTv className="text-[#E5D3B3] text-[48px] mt-13" size={30}/>
          <Text className="text-[20px] text-content-primary font-family-heading mt-2 mb-2">Tecnologia Avançada</Text>
          <Text className="text-wrap text-center text-[16px] text-content-ternary font-family-heading">Equipamentos modernos com suporte a apresentações em alta definição.</Text>
        </Card>
        <Card className="w-1/5 h-[280] bg-[#2A2A2A] justify-start items-center px-5">
          <FaWifi className="text-[#E5D3B3] text-[48px] mt-13" size={30}/>
          <Text className="text-[20px] text-center text-content-primary font-family-heading mt-2 mb-2">Internet de Alta Velocidade</Text>
          <Text className="text-wrap text-center text-[16px] text-content-ternary font-family-heading">Conexão rápida e estável para suas conferências virtuais.</Text>
        </Card>
      </HStack>
    </Layout> 
  );
}
