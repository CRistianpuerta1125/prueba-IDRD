import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UbicacionesService {
  constructor(private prisma: PrismaService) {}

  async getDepartamentos() {
    return this.prisma.departamento.findMany({
      orderBy: { nombre: 'asc' },
    });
  }

  async getCiudadesByDepartamento(departamentoId: number) {
    return this.prisma.ciudad.findMany({
      where: { departamentoId },
      orderBy: { nombre: 'asc' },
    });
  }

  async getAllCiudades() {
    return this.prisma.ciudad.findMany({
      include: {
        departamento: true,
      },
      orderBy: [
        { departamento: { nombre: 'asc' } },
        { nombre: 'asc' },
      ],
    });
  }
}