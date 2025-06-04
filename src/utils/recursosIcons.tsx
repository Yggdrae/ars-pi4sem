import {
  FaVideo,
  FaExpand,
  FaTv,
  FaSnowflake,
  FaChalkboard,
  FaDesktop,
  FaVolumeUp,
  FaMicrophone,
  FaCamera,
  FaWifi,
  FaGamepad,
  FaLightbulb,
  FaTabletAlt,
  FaPlug,
  FaFingerprint,
  FaQuestionCircle,
} from "react-icons/fa";
import { IconType } from "react-icons";

export type RecursoNome =
  | "Projetor"
  | "Tela"
  | "TV"
  | "Ar-condicionado"
  | "Quadro branco"
  | "PC Integrado"
  | "Som ambiente"
  | "Microfone"
  | "Câmera"
  | "Wi-Fi"
  | "Controle remoto"
  | "Luz dimerizável"
  | "Painel touch"
  | "Tomadas extras"
  | "Biometria";

const RecursoIconMap: Record<RecursoNome, IconType> = {
  Projetor: FaVideo,
  Tela: FaExpand,
  "TV": FaTv,
  "Ar-condicionado": FaSnowflake,
  "Quadro branco": FaChalkboard,
  "PC Integrado": FaDesktop,
  "Som ambiente": FaVolumeUp,
  Microfone: FaMicrophone,
  Câmera: FaCamera,
  "Wi-Fi": FaWifi,
  "Controle remoto": FaGamepad,
  "Luz dimerizável": FaLightbulb,
  "Painel touch": FaTabletAlt,
  "Tomadas extras": FaPlug,
  Biometria: FaFingerprint,
};

export function getRecursoIcon(
  nome: string,
  props?: React.ComponentProps<IconType>
) {
  const Icon = RecursoIconMap[nome as RecursoNome] || FaQuestionCircle;
  return <Icon {...props} />;
}
