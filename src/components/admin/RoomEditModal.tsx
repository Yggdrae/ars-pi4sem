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
    removeRecursoSala,
    addRecursoSala,
  } = useSalas();
  const { getRecursos } = useRecursos();
  const { showToast } = useToast();

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
        console.warn(data);
        setSala(data);
        setNumero(data.numero);
        setAndar(data.andar);
        setValorHora(data.valorHora);
        setRecursos(data.salasRecursos);
      });
      getRecursos().then((data) => {
        setTodosRecursos(data);
      });
    }
  }, [salaId]);

  const handleImagemChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert("Imagem excede 2MB.");
      return;
    }
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

    setTimeout(async () => {
      await updateSala(salaId, {
        numero,
        andar,
        valorHora,
      })
        .then(() => {
          showToast("Sala atualizada com sucesso!", "success");
          onClose();
        })
        .catch(() => {
          showToast("Erro ao atualizar sala.", "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 2000);
  };

  if (!sala) return null;

  return (
    <Modal isOpen={!!salaId} onClose={onClose} title={`Editar Sala ${numero}`}>
      <VStack className="gap-4">
        <InputText
          id="numero"
          label="Número da sala"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
        />
        <InputText
          id="andar"
          label="Andar"
          value={andar}
          onChange={(e) => setAndar(e.target.value)}
        />
        <InputText
          id="valorHora"
          label="Valor por hora"
          value={valorHora}
          onChange={(e) => setValorHora(e.target.value)}
        />

        <div>
          <Text className="mb-2 font-semibold text-content-primary">
            Imagens da sala
          </Text>
          <input type="file" accept="image/*" onChange={handleImagemChange} />
          <div className="flex gap-2 mt-2 flex-wrap">
            {sala &&
              sala.salasImagens.map((img: any, idx: number) => (
                <div key={idx} className="relative group">
                  <Image
                    src={`data:image/jpeg;base64,${btoa(
                      String.fromCharCode(...img.imagem.data)
                    )}`}
                    width={100}
                    height={100}
                    alt="sala"
                    className="rounded"
                    onClick={() => console.log(img.id)}
                  />
                  <button
                    className="absolute top-1 right-1 text-red-500 bg-black bg-opacity-50 rounded px-1 hidden group-hover:block"
                    onClick={() => {
                      handleRemoverImagem(img.id);
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
        </div>

        <div>
          <Text className="mb-2 font-semibold text-content-primary">
            Recursos
          </Text>
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
        </div>

        <Button
          title="Salvar alterações"
          onClick={handleSalvar}
          loading={isLoading}
        />
      </VStack>
    </Modal>
  );
}
