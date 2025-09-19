import { Departamento, Ciudad } from './ubicacion.model';
import { Material } from './material.model';

export interface ProyectoMaterial {
  id: number;
  proyectoId: number;
  materialId: number;
  cantidad: number;
  createdAt: string;
  updatedAt: string;
  material: Material;
}

export interface Proyecto {
  id: number;
  nombre: string;
  departamentoId: number;
  ciudadId: number;
  createdAt: string;
  updatedAt: string;
  departamento: Departamento;
  ciudad: Ciudad;
  proyectoMateriales: ProyectoMaterial[];
}

export interface CreateProyectoDto {
  nombre: string;
  departamentoId: number;
  ciudadId: number;
}

export interface UpdateProyectoDto {
  nombre?: string;
  departamentoId?: number;
  ciudadId?: number;
}

export interface AsignarMaterialDto {
  materialId: number;
  cantidad: number;
}

export interface ReporteMaterial {
  id: number;
  codigo: string;
  descripcion: string;
  unidad: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number;
}

export interface ReporteProyecto {
  proyecto: {
    id: number;
    nombre: string;
    departamento: string;
    ciudad: string;
  };
  materiales: ReporteMaterial[];
  costoTotal: number;
}