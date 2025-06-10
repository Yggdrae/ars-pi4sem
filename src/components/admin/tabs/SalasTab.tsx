import { VStack } from "@/components/VStack";
import { useSalas } from "@/hooks/useSalas";
import { FlexTable } from "@/components/FlexTable";
import React, { useEffect, useState } from "react";
import RoomEditModal from "../RoomEditModal";
import RoomHorariosModal from "@/components/RoomHorariosModal";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import Button from "@/components/Button";
import { HStack } from "@/components/HStack";
import { FaExclamationTriangle, FaPlus } from "react-icons/fa";
import { useToast } from "@/context/ToastContext";
import RoomCreateModal from "../RoomCreateModal";
import { ISala } from "@/interfaces/ISala";

export const SalasTab = () => {
  const { showToast } = useToast();
  const { getSalas, deleteSala, changeDestaqueStatus } = useSalas();
  const [salas, setSalas] = useState<ISala[]>([]);
  const [creating, setCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [salaId, setSalaId] = useState<number | null>(null);
  const [confirmationRequired, setConfirmationRequired] = useState(false);
  const [tipoModal, setTipoModal] = useState<"editar" | "horarios" | null>(
    null
  );

  useEffect(() => {
    const fetch = async () => {
      const data = await getSalas();
      setSalas(data);
    };
    fetch();
  }, [getSalas]);

  const colunas: { header: string; accessor: keyof ISala }[] = [
    { header: "Número", accessor: "numero" },
    { header: "Andar", accessor: "andar" },
    { header: "Valor", accessor: "valorHora" },
  ];

  const bool: {
    header: string;
    accessor: keyof ISala;
    editable: boolean;
    onClick?: (row: ISala) => void;
  }[] = [
    {
      header: "Destaque",
      accessor: "isDestaque",
      editable: true,
      onClick: (row: ISala) => handleDestaqueChange(row.id, row.isDestaque),
    },
  ];

  const actions = [
    {
      label: "Editar Detalhes",
      onClick: (row: ISala) => {
        setSalaId(row.id);
        setTipoModal("editar");
      },
    },
    {
      label: "Excluir",
      onClick: (row: ISala) => {
        setConfirmationRequired(true);
        setSalaId(row.id);
      },
      className: "bg-red-500 text-white",
    },
  ];

  const handleDelete = async (id: number) => {
    setIsLoading(true);

    setTimeout(async () => {
      await deleteSala(id)
        .then(async () => {
          const updated = await getSalas();
          setSalas(updated);
          showToast("Sala excluida com sucesso!", "success");
        })
        .catch(() => {
          showToast("Erro ao excluir sala.", "error");
        })
        .finally(() => {
          setIsLoading(false);
        });
    }, 2000);
  };

  const handleDestaqueChange = (salaId: number, isDestaque: boolean) => {
    let destaqueCounter: number = 0;
    salas.map((sala) => sala.isDestaque && destaqueCounter++);

    console.log(destaqueCounter);
    if (destaqueCounter >= 5 && !isDestaque) {
      showToast("Destaque atingiu o limite de 5 salas.", "error");
      return;
    } else {
      changeDestaqueStatus(salaId, isDestaque)
        .then(() => {
          showToast("Destaque alterado com sucesso!", "success");
          const updated = salas.map((sala) => {
            if (sala.id === salaId) {
              return { ...sala, isDestaque: !sala.isDestaque };
            }
            return sala;
          });
          setSalas(updated);
        })
        .catch(() => {
          showToast("Erro ao alterar destaque.", "error");
        });
    }
  };

  return (
    <VStack className="gap-8 mt-6">
      <Button
        title="Adicionar Sala"
        leftIcon={<FaPlus />}
        size="md"
        className="w-fit place-self-end"
        onClick={() => setCreating(true)}
      />
      <FlexTable
        data={salas.sort((a, b) => a.numero - b.numero)}
        columns={colunas}
        boolValues={bool}
        actions={actions}
      />
      {salaId && tipoModal === "editar" && (
        <RoomEditModal
          salaId={salaId}
          onClose={async () => {
            setSalaId(null);
            const updated = await getSalas();
            setSalas(updated);
          }}
        />
      )}
      {salaId && confirmationRequired && (
        <Modal
          title="Confirmar exclusão"
          isOpen={confirmationRequired}
          onClose={() => setConfirmationRequired(false)}
          footer={
            <HStack gap={4}>
              <Button
                title="Cancelar"
                className="bg-red-700 text-white hover:bg-red-600"
                disabled={isLoading}
                onClick={() => {
                  setConfirmationRequired(false);
                  setSalaId(null);
                }}
              />
              <Button
                title="Confirmar"
                onClick={() => handleDelete(salaId)}
                loading={isLoading}
              />
            </HStack>
          }
        >
          <HStack className="gap-2 items-center">
            <FaExclamationTriangle color="orange" />
            <Text>Tem certeza que deseja excluir essa sala?</Text>
          </HStack>
        </Modal>
      )}
      {creating && (
        <RoomCreateModal
          isOpen={creating}
          onClose={async () => {
            setCreating(false);
            const updated = await getSalas();
            setSalas(updated);
          }}
        />
      )}
    </VStack>
  );
};
