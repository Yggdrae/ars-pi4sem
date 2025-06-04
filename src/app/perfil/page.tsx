'use client'
import { ProfileCard } from "@/components/perfil/ProfileCard"
import { Layout } from "@/components/ui/Layout"
import { useAuth } from "@/context/authContext";
import { useState } from "react";

export default function Perfil() {
    const {userData} = useAuth();
    const [selectedTab, setSelectedTab] = useState<string>("dados");
    const splittedName: string[] = userData?.nome?.split(" ") || [];
    const initials: string = userData?.nome ? splittedName[0][0] + splittedName[splittedName.length - 1][0] : "";

    return (
        <Layout>
            <ProfileCard name={userData?.nome || "Carregando..."} email={userData?.email || "Carregando..."} initials={initials} selectedTab={selectedTab} onSelectTab={setSelectedTab} />
        </Layout>
    )
}