'use client'
import { ProfileCard } from "@/components/perfil/ProfileCard"
import { Layout } from "@/components/ui/Layout"
import { useState } from "react";

export default function Perfil() {
    const [selectedTab, setSelectedTab] = useState<string>("dados");
    const name: string = "Victor Nicacio";
    const email: string = "victorcnicacio@hotmail.com";
    const initials: string = "VN";

    return (
        <Layout>
            <ProfileCard name={name} email={email} initials={initials} selectedTab={selectedTab} onSelectTab={setSelectedTab} />
        </Layout>
    )
}