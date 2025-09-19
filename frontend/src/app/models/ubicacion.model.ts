export interface Departamento {
  id: number;
  nombre: string;
  createdAt: string;
  updatedAt: string;
}

export interface Ciudad {
  id: number;
  nombre: string;
  departamentoId: number;
  createdAt: string;
  updatedAt: string;
  departamento?: Departamento;
}