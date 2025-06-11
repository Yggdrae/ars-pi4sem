import { Suspense } from "react";
import { Layout } from "@/components/ui/Layout";
import { Text } from "@/components/Text";
import { SalasClient } from "./client";
import { SalaCardSkeleton } from "@/components/SalaCardSkeleton";

export default function SalasPage() {
  return (
    <Layout>
      <Text className="text-[24px] sm:text-[30px] text-content-primary font-family-heading font-bold mb-6">
        Salas Disponíveis
      </Text>
      <Suspense>
        <SalasClient />
      </Suspense>
    </Layout>
  );
}
