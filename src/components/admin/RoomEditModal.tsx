import React, { useEffect, useState } from "react";
import { Modal } from "@/components/Modal";
import { VStack } from "@/components/VStack";
import { InputText } from "@/components/InputText";
import Button from "@/components/Button";
import { Text } from "@/components/Text";
import { useSalas } from "@/hooks/useSalas";
import Image from "next/image";
import { useRecursos } from "@/hooks/useRecursos";
import { useToast } from "@/context/ToastContext";
import { HStack } from "../HStack";
import { useMediaQuery } from "react-responsive";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableImage } from "../SortableImage";

interface RoomEditModalProps {
  salaId: number;
  onClose: () => void;
}

export default function RoomEditModal({ salaId, onClose }: RoomEditModalProps) {
  const {
    getSalaFullById,
    updateSala,
    removeImagem,
    uploadImagem,
    reorderImagens,
    removeRecursoSala,
    addRecursoSala,
  } = useSalas();
  const { getRecursos } = useRecursos();
  const { showToast } = useToast();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const [isLoading, setIsLoading] = useState(false);
  const [sala, setSala] = useState<ISala | null>(null);
  const [numero, setNumero] = useState("");
  const [andar, setAndar] = useState("");
  const [valorHora, setValorHora] = useState("");
  const [recursos, setRecursos] = useState<any[]>([]);
  const [todosRecursos, setTodosRecursos] = useState<any[]>([]);

  useEffect(() => {
    if (salaId) {
      getSalaFullById(salaId).then((data) => {
        setSala(data);
        setNumero(data.numero);
        setAndar(data.andar);
        setValorHora(data.valorHora);
        setRecursos(data.salasRecursos);
      });
      getRecursos().then(setTodosRecursos);
    }
  }, [salaId]);

  const handleImagemChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) return alert("Imagem excede 2MB.");
    await uploadImagem({ salaId, imagem: file });
    const updated = await getSalaFullById(salaId);
    setSala(updated);
  };

  const handleRemoverImagem = async (id: number) => {
    await removeImagem(id);
    const updated = await getSalaFullById(salaId);
    setSala(updated);
  };

  const handleRemoverRecurso = async (id: number) => {
    if (!confirm("Deseja remover este recurso?")) return;
    await removeRecursoSala(id);
    const updated = await getSalaFullById(salaId);
    setSala(updated);
    setTimeout(() => {
      setRecursos(updated.salasRecursos);
      showToast("Recurso removido com sucesso!", "success");
    }, 500);
  };

  const handleAdicionarRecurso = async (id: number) => {
    try {
      await addRecursoSala({ sala: salaId, recurso: id, quantidade: 1 });
      const updated = await getSalaFullById(salaId);
      setSala(updated);
      setTimeout(() => {
        setRecursos(updated.salasRecursos);
        showToast("Recurso adicionado com sucesso!", "success");
      }, 500);
    } catch (r) {
      showToast("Erro ao adicionar recurso.", "error");
    }
  };

  const handleSalvar = async () => {
    setIsLoading(true);
    await updateSala(salaId, { numero, andar, valorHora })
      .then(() => {
        showToast("Sala atualizada com sucesso!", "success");
        onClose();
      })
      .catch(() => showToast("Erro ao atualizar sala.", "error"))
      .finally(() => setIsLoading(false));
  };

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = sala!.salasImagens.findIndex((img) => img.id === active.id);
    const newIndex = sala!.salasImagens.findIndex((img) => img.id === over.id);
    const reordered = arrayMove(sala!.salasImagens, oldIndex, newIndex);

    setSala({ ...sala!, salasImagens: reordered });
    await reorderImagens({ salaId, ids: reordered.map((img) => img.id) });
  };

  if (!sala) return null;

  return (
    <Modal
      isOpen={!!salaId}
      onClose={onClose}
      title={`Editar Sala ${numero}`}
      className="xl:max-w-2xl 2xl:max-w-5xl xl:min-h-[70vh] 2xl:min-h-[50vh] "
    >
      <VStack className="gap-6 p-4 md:flex-row flex-col">
        <VStack className="flex-1 gap-4">
          <InputText id="numero" label="Número da sala" value={numero} onChange={(e) => setNumero(e.target.value)} />
          <InputText id="andar" label="Andar" value={andar} onChange={(e) => setAndar(e.target.value)} />
          <InputText id="valorHora" label="Valor por hora" value={valorHora} onChange={(e) => setValorHora(e.target.value)} />
        </VStack>

        <VStack className="flex-1 gap-4">
          <Text className="font-semibold text-content-primary">Imagens da sala</Text>
          <input type="file" accept="image/*" onChange={handleImagemChange} />

          <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={sala.salasImagens.map((img) => img.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {sala.salasImagens.map((img) => (
                  <SortableImage
                    key={img.id}
                    id={img.id}
                    src={img.imagemBase64}
                    onRemove={() => handleRemoverImagem(img.id)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>

          <Text className="font-semibold text-content-primary">Recursos</Text>
          <div className="flex flex-wrap gap-2">
            {recursos.map((r) => (
              <div
                key={r.id}
                className="relative px-3 py-1 bg-gray-700 text-white rounded-full group cursor-pointer"
              >
                {r.recurso.nome}
                <button
                  onClick={() => handleRemoverRecurso(r.id)}
                  className="absolute -top-2 -right-2 text-sm bg-red-500 rounded-full px-2 hidden group-hover:block"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <select
            className="mt-2 bg-gray-800 text-white p-2 rounded"
            onChange={(e) => handleAdicionarRecurso(Number(e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>
              Adicionar recurso
            </option>
            {todosRecursos.map((r) => (
              <option
                key={r.id}
                value={r.id}
                disabled={recursos.some((s) => s.recurso.id === r.id)}
              >
                {r.nome}
              </option>
            ))}
          </select>
        </VStack>
      </VStack>

      <div className="mt-6 place-self-end">
        <Button title="Salvar alterações" onClick={handleSalvar} loading={isLoading} />
      </div>
    </Modal>
  );
}
