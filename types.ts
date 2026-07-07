export type NodeType = "text" | "submenu";

// Fix: Added MenuSection enum used by MenuCard, MenuGrid, and SectionDetail components
export enum MenuSection {
  TURISMO = "Turismo Cultural",
  NATURALEZA = "Turismo de Naturaleza",
  PRODUCTOS = "Productos de la Tierra",
  HISTORIA = "Historia y Patrimonio",
}

export interface NavigationNode {
  id: string;
  tipo: NodeType;
  titulo: string;
  tituloGeneral?: string;
  tipoLogo?: "image" | "icon" | "video" | "url";
  descripcion?: string;
  opciones?: NavigationNode[];
  imagen?: string; // Imagen principal para el modo detalle
  card?: CardElement[];
  protectordepantalla?: {
    id: string;
    tipo: "text";
    titulo: string;
    logo: string;
    imagen: string;
    video: string;
    protectordepantalla: boolean;
    duracion: number;
    inactividad: number;
    tiempo: number;
    seleccionarprotector: "video" | "imagen";
    descripcion: string;
  };
}

export interface NavigationState {
  currentNode: NavigationNode;
  history: NavigationNode[];
}

export interface CardElement {
  tipo:
    | "text-h2"
    | "text-h3"
    | "text-p"
    | "text-p-relaxed"
    | "table-schedules"
    | "table-rates";
  titulo: string;
  color?:
    | "blue"
    | "green"
    | "red"
    | "yellow"
    | "white"
    | "black"
    | "gray"
    | "orange"
    | "purple"; // table-schedules, table-rates
  contenido?: {
    // table-schedules, table-rates
    columnas: string[];
    filas: {
      fila1: string;
      fila2: string;
      fila3: string;
    }[];
  };
}
