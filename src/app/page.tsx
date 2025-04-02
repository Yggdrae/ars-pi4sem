'use client'
import { Button } from "@/components/Button";
import { HStack } from "@/components/HStack";
import Image from 'next/image'
import { VStack } from "@/components/VStack";
import Card from "@/components/Card";
import { InputField } from "@/components/InputField";
import { Navbar } from "@/components/Navbar";
import { redirect } from "next/navigation";
import { Layout } from "@/components/ui/Layout";

export default function Home() {

  return (
    <Layout>
      <Card className="min-w-full min-h-[300px]">
        <div className="absolute w-full bg-gradient-to-r from-content-secondary to-transparent bg-cover bg-center z-10"/>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('src/assets/conference-room.png')" }} />
      </Card>
    </Layout>
  );
}
