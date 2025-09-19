export interface Unidad {
  id: number;
  nombre: string;
  simbolo: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUnidadDto {
  nombre: string;
  simbolo: string;
}

export interface UpdateUnidadDto {
  nombre?: string;
  simbolo?: string;
}