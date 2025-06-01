import React from "react";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableImage } from "@/components/SortableImage";

interface RoomTabImagensProps {
    sala: any;
    setSala: any;
    imagens?: any[];
    setImagens?: any;
    isCreating?: boolean;
}

export function RoomTabImagens({ sala, setSala, imagens = [], setImagens, isCreating = false }: RoomTabImagensProps) {
  const handleImagemChange = async (e: any) => {
    const file = e.target.files?.[0];
    if (!file || file.size > 2 * 1024 * 1024) return alert("Imagem excede 2MB.");

    if (isCreating) {
      setImagens([...imagens, file]);
    }
  };

  const handleRemoverImagem = async (idOrIndex: number) => {
    if (isCreating) {
      const newImagens = [...imagens];
      newImagens.splice(idOrIndex, 1);
      setImagens(newImagens);
    }
  };

  return (
    <VStack className="gap-4">
      <Text className="font-semibold text-content-primary">Imagens da sala</Text>
      <input type="file" accept="image/*" onChange={handleImagemChange} />

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {(isCreating ? imagens : sala.salasImagens).map((img: any, i: number) => (
          <SortableImage
            key={isCreating ? i : img.id}
            id={isCreating ? i : img.id}
            src={isCreating ? URL.createObjectURL(img) : img.imagemBase64}
            onRemove={() => handleRemoverImagem(isCreating ? i : img.id)}
          />
        ))}
      </div>
    </VStack>
  );
}