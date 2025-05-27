import Button from "@/components/Button";
import { HStack } from "@/components/HStack";
import { InputText } from "@/components/InputText";
import { Modal } from "@/components/Modal";
import { Text } from "@/components/Text";
import { VStack } from "@/components/VStack";
import { useAuth } from "@/context/authContext";
import { useToast } from "@/context/ToastContext";
import { useForm } from "@/hooks/useForms";
import { useState } from "react";

interface IForm {
  nome?: string;
  email?: string;
  senha?: string;
}

export const DadosTab = () => {
  const { userData } = useAuth();
  const { showToast } = useToast();
  const { submit, loading } = useForm<IForm>({
    endpoint: `/usuarios/${userData?.id}`,
    method: "PUT",
    onSuccess: () => {
      window.location.reload();
    },
    onError: (err) => console.log("Erro!", err),
  });
  const [editView, setEditView] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingPass, setLoadingPass] = useState<boolean>(false);
  const [modalVisivel, setModalVisivel] = useState<boolean>(false);
  const [nome, setNome] = useState<string>(userData?.nome || "");
  const [email, setEmail] = useState<string>(userData?.email || "");
  const [senha, setSenha] = useState<string>("");
  const [confSenha, setConfSenha] = useState<string>("");

  const nomeRegex = /^[A-Za-zÀ-ÿ]+(?: [A-Za-zÀ-ÿ]+)+$/;
  const emailRegex = /^[\w-.+]+@([\w-]+\.)+[\w-]{2,}$/;
  const senhaRegex =
    /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const [nomeError, setNomeError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [senhaError, setSenhaError] = useState("");
  const [confSenhaError, setConfSenhaError] = useState("");

  function primeiroNomeMudou(antes: string, depois: string): boolean {
    const pegarPrimeiro = (nome: string) =>
      nome
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim()
        .toLowerCase()
        .split(" ")[0];

    return pegarPrimeiro(antes) !== pegarPrimeiro(depois);
  }

  const validateNome = (value: string) => {
    if (!nomeRegex.test(value)) return "Digite nome e sobrenome.";
    return "";
  };

  const validateEmail = (value: string) => {
    if (!emailRegex.test(value)) return "Digite um email válido.";
    return "";
  };

  const handleSaveInfo = async () => {
    setIsLoading(true);

    const nomeErr = validateNome(nome);
    const emailErr = validateEmail(email);

    setNomeError(nomeErr);
    setEmailError(emailErr);

    if (nomeErr || emailErr) {
      setIsLoading(false);
      return;
    }

    if (primeiroNomeMudou(userData!.nome, nome)) {
      showToast("Nome muito diferente do antigo.", "error");
      setIsLoading(false);
      return;
    }

    setTimeout(async () => {
      await submit({ nome, email });
      showToast("Informações salvas com sucesso!", "success");
      setIsLoading(false);
      setEditView(false);
    }, 2000);
  };

  const validateSenha = (value: string) => {
    if (!senhaRegex.test(value))
      return "Mín. 8 caracteres com letra, número e símbolo.";
    return "";
  };

  const validateConfirmacao = (value: string, original: string) => {
    if (value !== original) return "As senhas não conferem.";
    return "";
  };

  const handleSavePass = async () => {
    setLoadingPass(true);

    const senhaErr = validateSenha(senha);
    const confErr = validateConfirmacao(confSenha, senha);

    if (senhaErr || confErr) {
      setLoadingPass(false);
      return;
    }

    setTimeout(async () => {
      await submit({ senha });
      showToast("Senha alterada com sucesso!", "success");
      setLoadingPass(false);
      setModalVisivel(false);
    }, 2000);
  };

  return (
    <VStack className="gap-6 mt-6">
      <Modal
        isOpen={modalVisivel}
        onClose={() => setModalVisivel(false)}
        title="Alterar Senha"
        footer={
          <>
            <Button
              title="Cancelar"
              variant="secondary"
              onClick={() => setModalVisivel(false)}
            />
            <Button title="Salvar" onClick={() => handleSavePass()} loading={loadingPass} />
          </>
        }
      >
        <VStack className="gap-4">
          <InputText
            id="senha"
            label="Senha"
            type="password"
            value={senha}
            onChange={(e) => {
              setSenha(e.target.value);
              setSenhaError(validateSenha(e.target.value));
            }}
            onBlur={() => setSenhaError(validateSenha(senha))}
            placeholder="Digite a nova senha"
            errorText={senhaError}
          />
          <InputText
            id="confSenha"
            label="Confirmar Senha"
            type="password"
            value={confSenha}
            onChange={(e) => {
              setConfSenha(e.target.value);
              setConfSenhaError(validateConfirmacao(e.target.value, senha));
            }}
            onBlur={() =>
              setConfSenhaError(validateConfirmacao(confSenha, senha))
            }
            placeholder="Confirme a nova senha"
            errorText={confSenhaError}
          />
        </VStack>
      </Modal>

      <HStack className="justify-between items-center">
        <Text className="text-lg font-semibold text-content-primary">
          Dados Pessoais
        </Text>
        {!editView ? (
          <Button
            title="Editar"
            variant="secondary"
            className="w-fit"
            onClick={() => setEditView(true)}
          />
        ) : (
          <HStack className="gap-2">
            <Button
              title="Cancelar"
              variant="primary"
              className="w-fit bg-error-500 hover:bg-error-800"
              onClick={() => setEditView(false)}
            />
            <Button
              title="Salvar"
              variant="primary"
              className="w-fit"
              loading={isLoading}
              onClick={() => handleSaveInfo()}
            />
          </HStack>
        )}
      </HStack>

      <div className="flex flex-wrap gap-4">
        <InputText
          id="nome"
          label="Nome Completo"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            setNomeError(validateNome(e.target.value));
          }}
          onBlur={() => setNomeError(validateNome(nome))}
          placeholder="Seu Nome"
          className="w-full sm:w-[48%]"
          errorText={nomeError}
          disabled={!editView}
        />
        <InputText
          id="email"
          label="Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setEmailError(validateEmail(e.target.value));
          }}
          onBlur={() => setEmailError(validateEmail(email))}
          placeholder="Seu Email"
          className="w-full sm:w-[48%]"
          errorText={emailError}
          disabled={!editView}
        />
      </div>

      <VStack className="mt-8 gap-4">
        <Text className="text-lg font-semibold text-content-primary">
          Segurança
        </Text>
        <Button
          title="Alterar Senha"
          variant="secondary"
          className="w-fit"
          onClick={() => setModalVisivel(true)}
        />
      </VStack>
    </VStack>
  );
};
