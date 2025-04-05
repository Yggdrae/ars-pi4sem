import { HStack } from "./HStack";
import { VStack } from "./VStack";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function Footer({ children, ...props }: FooterProps) {
    return (
        <div className={`flex flex-row bg-content-secondary border-t border-t-content-primary/30 w-full h-[270px] self-center justify-center py-8 px-20 ${props.className}`}>
            <VStack className="w-full h-full justify-between">
                <HStack className="justify-between">
                    <VStack className="w-1/4">
                        <p className="text-content-primary text-[18px] font-family-heading mb-6">Golden Space</p>
                        <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Soluções elegantes para suas reuniões corporativas.</p>
                    </VStack>
                    <VStack className="w-1/4">
                        <p className="text-content-primary text-[18px] font-family-heading mb-6">Contato</p>
                        <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Email: contato@eldorado.com</p><></>
                        <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Telefone: (11) 91234-5678</p><></>
                        <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Endereço: Av. Paulista, 1000 - São Paulo, SP</p>
                    </VStack>
                    <VStack className="w-1/4">
                        <p className="text-content-primary text-[18px] font-family-heading mb-6">Horários</p>
                        <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Segunda a Sexta: 08:00 - 20:00</p>
                        <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Sábado: 09:00 - 15:00</p>
                        <p className="text-content-ternary text-[16px] font-family-heading text-wrap">Domingo: Fechado</p>
                    </VStack>
                </HStack>
                <div className="self-center border-t-1 w-full border-t-content-ternary/30 mt-4">
                    <p className="text-[#99A1AF] text-[16px] font-family-heading text-center text-wrap mt-4">© 2025 Eldorado. Todos os direitos reservados.</p>
                </div>
            </VStack>
        </div>
    );
} ""