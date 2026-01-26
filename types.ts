
export type NodeType = 'text' | 'submenu';

// Fix: Added MenuSection enum used by MenuCard, MenuGrid, and SectionDetail components
export enum MenuSection {
  TURISMO = 'Turismo Cultural',
  NATURALEZA = 'Turismo de Naturaleza',
  PRODUCTOS = 'Productos de la Tierra',
  HISTORIA = 'Historia y Patrimonio'
}

export interface NavigationNode {
  id: string;
  tipo: NodeType;
  titulo: string;
  logo: string; // Puede ser una URL de imagen o un identificador de icono
  descripcion?: string;
  opciones?: NavigationNode[];
  imagen?: string; // Imagen principal para el modo detalle
}

export interface NavigationState {
  currentNode: NavigationNode;
  history: NavigationNode[];
}
