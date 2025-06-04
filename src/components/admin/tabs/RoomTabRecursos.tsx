import React from "react";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { useToast } from "@/context/ToastContext";
import { useSalas } from "@/hooks/useSalas";

interface RoomTabRecursosProps {
  sala: any;
  setSala: any;
  todosRecursos: any[];
  recursosSelecionados?: any[];
  setRecursosSelecionados?: any;
  isCreating?: boolean;
}

export function RoomTabRecursos({
  sala,
  setSala,
  todosRecursos,
  recursosSelecionados = [],
  setRecursosSelecionados,
  isCreating = false,
}: RoomTabRecursosProps) {
  const { removeRecursoSala, addRecursoSala, getSalaFullById } = useSalas();
  const { showToast } = useToast();

  const handleRemoverRecurso = async (id: number) => {
    if (isCreating) {
      setRecursosSelecionados(recursosSelecionados.filter((r) => r !== id));
    } else {
      if (!confirm("Deseja remover este recurso?")) return;
      await removeRecursoSala(id);
      const updated = await getSalaFullById(sala.id);
      setSala(updated);
      showToast("Recurso removido com sucesso!", "success");
    }
  };

  const handleAdicionarRecurso = async (id: number) => {
    if (isCreating) {
      if (!recursosSelecionados.includes(id)) {
        setRecursosSelecionados([...recursosSelecionados, id]);
      }
    } else {
      try {
        await addRecursoSala({ sala: sala.id, recurso: id, quantidade: 1 });
        const updated = await getSalaFullById(sala.id);
        setSala(updated);
        showToast("Recurso adicionado com sucesso!", "success");
      } catch {
        showToast("Erro ao adicionar recurso.", "error");
      }
    }
  };

  const recursosAtuais = isCreating
    ? recursosSelecionados.map((id) => todosRecursos.find((r) => r.id === id))
    : sala.salasRecursos.map((r: any) => r);

  return (
    <VStack className="gap-4">
      <Text className="font-semibold text-content-primary">Recursos</Text>
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
            disabled={
              recursosSelecionados.includes(r.id) ||
              recursosAtuais.some((s: any) => s.id === r.id)
            }
          >
            {r.nome}
          </option>
        ))}
      </select>

      <div className="flex flex-wrap gap-2">
        {recursosAtuais.map((r: any) => (
          <div
            key={r.id}
            className="relative px-3 py-1 bg-gray-700 text-white rounded-full group cursor-pointer"
            onClick={() => console.log(r)}
          >
            {!isCreating ? r.recurso.nome : r.nome}
            <button
              onClick={() => handleRemoverRecurso(r.id)}
              className="absolute -top-2 -right-2 text-sm bg-red-500 rounded-full px-2 hidden group-hover:block"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </VStack>
  );
}
