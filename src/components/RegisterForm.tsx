import { useState } from "react"
import Button from "./Button"
import { HStack } from "./HStack"
import { InputText } from "./InputText"
import { Text } from "./Text"
import { VStack } from "./VStack"
import Link from "next/link";

export const RegisterForm = ({ className = "" }: { className?: string }) => {
    const nomeRegex = /^[A-Za-z]+$/;
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const senhaRegex = /^[A-Za-z0-9]{8}$/;

    const [nome, setNome] = useState<any>('');
    const [nomeError, setNomeError] = useState<any>('');

    const [email, setEmail] = useState<any>('');
    const [emailError, setEmailError] = useState<any>('');

    const [senha, setSenha] = useState<any>('');
    const [senhaError, setSenhaError] = useState<any>('')

    const [confSenha, setConfSenha] = useState<any>('');
    const [confSenhaError, setConfSenhaError] = useState<any>('');

    const checkFields = async () => {
        let errorsCount: number = 0;

        const isNameValid = nomeRegex.test(nome);
        if (!isNameValid) {
            setNomeError('Insira um nome válido!');
            errorsCount++;
        }

        const isEmailValid = emailRegex.test(email);
        if (!isEmailValid) {
            setEmailError('Insira um email válido!');
            errorsCount++;
        }

        const isPasswordValid = senhaRegex.test(senha);
        if (!isPasswordValid) {
            setSenhaError('Insira uma senha válida!');
            errorsCount++;
        }

        if (errorsCount > 0) return;

        if (senha !== confSenha) {
            setSenhaError("As senhas não conferem!");
            setConfSenhaError("As senhas não conferem!");
            return;
        }

        
    }

    return (
        <VStack className={`bg-[#2A2A2A] p-6 sm:p-8 flex-grow ${className}`}>
            <Text className="text-center text-[20px] lg:text-[24px] text-content-primary font-family-heading font-bold">Criar Conta</Text>
            <Text className="text-center text-[12px] lg:text-[14px] text-content-ternary font-family-heading font-bold">Preencha os campos abaixo para se cadastrar </Text>
            <InputText
                errorText={nomeError}
                value={nome}
                onChange={(e) => {
                    setNome(e.target.value);
                    setNomeError('')
                }}
                id="nome"
                label="Nome Completo"
                placeholder="Digite seu nome"
                className="mt-4"
            />
            <InputText
                errorText={emailError}
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailError('');
                }}
                id="email"
                label="Email"
                placeholder="Digite seu email"
                className="mt-4"
            />
            <InputText
                errorText={senhaError}
                value={senha}
                onChange={(e) => {
                    setSenha(e.target.value);
                    setSenhaError('');
                }}
                id="password" type="password"
                label="Senha"
                placeholder="Digite sua senha"
                className="mt-4"
            />
            <InputText
                errorText={confSenhaError}
                value={confSenha}
                onChange={(e) => {
                    setConfSenha(e.target.value);
                    setConfSenhaError('');
                }}
                id="passconfirm"
                type="password"
                label="Confirme sua Senha"
                placeholder="Digite sua senha novamente"
                className="mt-4"
            />
            <Button title={"Cadastrar"} className="mt-8" onClick={() => {
                checkFields();
            }} />
        </VStack>
    )
}