import React, { useEffect, useState } from "react";
import { VStack } from "@/components/VStack";
import { InputText } from "@/components/InputText";
import Button from "@/components/Button";
import { useToast } from "@/context/ToastContext";
import { useSalas } from "@/hooks/useSalas";

interface RoomTabDetalhesProps {
    sala: any;
    setSala: (sala: any) => void;
    onClose: () => void;
    isCreating?: boolean;
}

export function RoomTabDetalhes({ sala, setSala, onClose, isCreating = false }: RoomTabDetalhesProps) {
    const { updateSala } = useSalas();
    const { showToast } = useToast();

    const [numero, setNumero] = useState("");
    const [andar, setAndar] = useState("");
    const [valorHora, setValorHora] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setNumero(String(sala.numero || ""));
        setAndar(String(sala.andar || ""));
        setValorHora(String(sala.valorHora || ""));
        setCapacidade(String(sala.capacidade || ""));
    }, [sala]);

    const handleSalvar = async () => {
        setIsLoading(true);
        try {
            await updateSala(sala.id, { numero, andar, valorHora });
            showToast("Sala atualizada com sucesso!", "success");
            onClose();
        } catch {
            showToast("Erro ao atualizar sala.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (isCreating) {
            setSala({ numero, andar, valorHora });
        }
    }, [numero, andar, valorHora]);

    return (
        <VStack className="gap-4">
            <InputText id="numero" label="Número da sala" value={numero} onChange={(e) => setNumero(e.target.value)} />
            <InputText id="andar" label="Andar" value={andar} onChange={(e) => setAndar(e.target.value)} />
            <InputText id="valorHora" label="Valor por hora" value={valorHora} onChange={(e) => setValorHora(e.target.value)} />
            <InputText id="capacidade" label="Capacidade" value={capacidade} onChange={(e) => setCapacidade(e.target.value)} />
            {!isCreating && (
                <div className="mt-4">
                    <Button title="Salvar alterações" onClick={handleSalvar} loading={isLoading} />
                </div>
            )}
        </VStack>
    );
}