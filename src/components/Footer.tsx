import { HStack } from "./HStack";
import { VStack } from "./VStack";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode
}

export function Footer({ children, ...props }: FooterProps) {
    return (
        <div className={`bg-content-secondary border-t border-t-content-primary/30 w-full self-center py-10 px-6 sm:px-10 lg:px-20 ${props.className}`}>
            <VStack className="w-full gap-10">
                {/* Container de colunas com responsividade */}
                <div className="flex flex-col lg:flex-row justify-between gap-y-8 w-full">
                    <VStack className="w-full lg:w-1/3 gap-2">
                        <p className="text-content-primary text-[18px] font-family-heading">Golden Space</p>
                        <p className="text-content-ternary text-[16px] font-family-heading">Soluções elegantes para suas reuniões corporativas.</p>
                    </VStack>
                    <VStack className="w-full lg:w-1/3 gap-2">
                        <p className="text-content-primary text-[18px] font-family-heading">Contato</p>
                        <p className="text-content-ternary text-[16px] font-family-heading">Email: contato@eldorado.com</p>
                        <p className="text-content-ternary text-[16px] font-family-heading">Telefone: (11) 91234-5678</p>
                        <p className="text-content-ternary text-[16px] font-family-heading">Endereço: Av. Paulista, 1000 - São Paulo, SP</p>
                    </VStack>
                    <VStack className="w-full lg:w-1/3 gap-2">
                        <p className="text-content-primary text-[18px] font-family-heading">Horários</p>
                        <p className="text-content-ternary text-[16px] font-family-heading">Segunda a Sexta: 08:00 - 20:00</p>
                        <p className="text-content-ternary text-[16px] font-family-heading">Sábado: 09:00 - 15:00</p>
                        <p className="text-content-ternary text-[16px] font-family-heading">Domingo: Fechado</p>
                    </VStack>
                </div>

                {/* Divisor e direitos autorais */}
                <div className="border-t border-t-content-ternary/30 pt-4 text-center">
                    <p className="text-[#99A1AF] text-[14px] sm:text-[16px] font-family-heading">© 2025 Eldorado. Todos os direitos reservados.</p>
                </div>
            </VStack>
        </div>
    );
}