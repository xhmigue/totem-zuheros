
export enum MenuSection {
  CULTURAL = 'TURISMO CULTURAL',
  NATURALEZA = 'TURISMO DE NATURALEZA',
  PRODUCTOS = 'PRODUCTOS DE LA TIERRA',
  FIESTAS = 'FIESTAS TRADICIONALES',
  SERVICIOS = 'SERVICIOS',
  AGENDA = 'AGENDA MENSUAL'
}

export interface MenuItem {
  id: MenuSection;
  label: string;
  icon?: string;
}
