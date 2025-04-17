import { useState } from "react";
import { VStack } from "@/components/VStack";
import { Text } from "@/components/Text";
import { Switch } from "@/components/Switch";

export const HistoricoTab = () => {
  const [settings, setSettings] = useState({
    email: true,
    sms: false,
    navegador: true,
    lembretes: true,
    promocoes: false,   
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <VStack className="gap-8 mt-6">
      <VStack className="gap-4">
        <Text className="text-lg font-semibold text-content-primary">Histórico de Reservas</Text>

        <div className="flex justify-between items-center bg-[#1E1E1E] border border-[#333] rounded-lg px-4 py-3">
          <VStack className="gap-1">
            <Text className="text-content-primary font-medium text-sm">Email</Text>
            <Text className="text-content-ternary text-sm">Receba notificações por email</Text>
          </VStack>
          <Switch checked={settings.email} onCheckedChange={() => toggleSetting("email")} />
        </div>

        <div className="flex justify-between items-center bg-[#1E1E1E] border border-[#333] rounded-lg px-4 py-3">
          <VStack className="gap-1">
            <Text className="text-content-primary font-medium text-sm">SMS</Text>
            <Text className="text-content-ternary text-sm">Receba notificações por SMS</Text>
          </VStack>
          <Switch checked={settings.sms} onCheckedChange={() => toggleSetting("sms")} />
        </div>

        <div className="flex justify-between items-center bg-[#1E1E1E] border border-[#333] rounded-lg px-4 py-3">
          <VStack className="gap-1">
            <Text className="text-content-primary font-medium text-sm">Notificações no navegador</Text>
            <Text className="text-content-ternary text-sm">Receba notificações quando estiver usando o site</Text>
          </VStack>
          <Switch checked={settings.navegador} onCheckedChange={() => toggleSetting("navegador")} />
        </div>
      </VStack>

      <VStack className="gap-4">
        <Text className="text-lg font-semibold text-content-primary">Tipos de notificações</Text>

        <div className="flex justify-between items-center bg-[#1E1E1E] border border-[#333] rounded-lg px-4 py-3">
          <VStack className="gap-1">
            <Text className="text-content-primary font-medium text-sm">Lembretes de reserva</Text>
            <Text className="text-content-ternary text-sm">Receba lembretes sobre suas próximas reservas</Text>
          </VStack>
          <Switch checked={settings.lembretes} onCheckedChange={() => toggleSetting("lembretes")} />
        </div>

        <div className="flex justify-between items-center bg-[#1E1E1E] border border-[#333] rounded-lg px-4 py-3">
          <VStack className="gap-1">
            <Text className="text-content-primary font-medium text-sm">Promoções e novidades</Text>
            <Text className="text-content-ternary text-sm">Fique por dentro de ofertas e novidades</Text>
          </VStack>
          <Switch checked={settings.promocoes} onCheckedChange={() => toggleSetting("promocoes")} />
        </div>
      </VStack>
    </VStack>
  );
};