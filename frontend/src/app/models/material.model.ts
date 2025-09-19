import { Unidad } from './unidad.model';

export interface Material {
  id: number;
  codigo: string;
  descripcion: string;
  unidadId: number;
  precio: number;
  createdAt: string;
  updatedAt: string;
  unidad: Unidad;
}

export interface CreateMaterialDto {
  codigo: string;
  descripcion: string;
  unidadId: number;
  precio: number;
}

export interface UpdateMaterialDto {
  codigo?: string;
  descripcion?: string;
  unidadId?: number;
  precio?: number;
}