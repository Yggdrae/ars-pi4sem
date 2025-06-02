import { SortableImage } from "@/components/SortableImage";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { FaUpload } from "react-icons/fa";

interface SalaImagem {
  id: number;
  imagemBase64: string;
}

interface RoomTabImagensProps {
  imagens?: File[];
  setImagens?: (imgs: File[]) => void;
  isCreating?: boolean;
  imagensReordenadas?: SalaImagem[];
  setImagensReordenadas?: (imgs: SalaImagem[]) => void;
}

export function RoomTabImagens({
  imagens = [],
  setImagens,
  isCreating = false,
  imagensReordenadas = [],
  setImagensReordenadas,
}: RoomTabImagensProps) {
  const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const validFiles: File[] = files.filter(
      (file) => file.size <= 2 * 1024 * 1024
    );
    const tooBigFiles = files.filter((file) => file.size > 2 * 1024 * 1024);

    if (tooBigFiles.length)
      alert("Algumas imagens excedem o limite de 2MB e foram ignoradas.");

    if (!validFiles.length) return;

    setImagens && setImagens([...imagens, ...validFiles]);
  };

  const handleRemoverImagem = (indexOrId: number) => {
    if (isCreating && setImagens) {
      const novas = [...imagens];
      novas.splice(indexOrId, 1);
      setImagens(novas);
    } else if (setImagensReordenadas) {
      const novas = imagensReordenadas.filter((img) => img.id !== indexOrId);
      setImagensReordenadas(novas);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;
    if (!setImagensReordenadas) return;

    const oldIndex = imagensReordenadas.findIndex(
      (img) => img.id === active.id
    );
    const newIndex = imagensReordenadas.findIndex((img) => img.id === over.id);

    if (oldIndex === -1 || newIndex === -1) return;

    const reordered = arrayMove(imagensReordenadas, oldIndex, newIndex);
    setImagensReordenadas(reordered);
  };

  const imagensParaExibir = isCreating ? imagens : imagensReordenadas;

  return (
    <VStack className="gap-4">
      <Text className="font-semibold text-content-primary">
        Imagens da sala
      </Text>
      <label className="inline-block cursor-pointer border border-dashed border-[#E5D3B3] p-6 rounded-lg text-content-primary hover:bg-[#E5D3B3]/10 transition-colors w-full text-center">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={handleImagemChange}
        />
        <div className="flex flex-col items-center justify-center gap-2">
          <FaUpload className="text-2xl text-[#E5D3B3]" />
          <span className="text-sm font-medium">
            Clique para adicionar imagens
          </span>
          <span className="text-xs text-content-ternary">
            Você pode selecionar múltiplas imagens
          </span>
        </div>
      </label>

      {imagensParaExibir.length > 0 && (
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={imagensParaExibir.map((img, idx) =>
              isCreating ? idx : (img as SalaImagem).id
            )}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {imagensParaExibir.map((img, i) => (
                <SortableImage
                  key={isCreating ? i : (img as SalaImagem).id}
                  id={isCreating ? i : (img as SalaImagem).id}
                  src={
                    isCreating
                      ? URL.createObjectURL(img as File)
                      : (img as SalaImagem).imagemBase64
                  }
                  onRemove={() =>
                    handleRemoverImagem(isCreating ? i : (img as SalaImagem).id)
                  }
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </VStack>
  );
}
