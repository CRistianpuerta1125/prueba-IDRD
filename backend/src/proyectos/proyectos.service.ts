import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { AsignarMaterialDto } from './dto/asignar-material.dto';

@Injectable()
export class ProyectosService {
  constructor(private prisma: PrismaService) {}

  async create(createProyectoDto: CreateProyectoDto) {
    return this.prisma.proyecto.create({
      data: createProyectoDto,
      include: {
        departamento: true,
        ciudad: true,
      },
    });
  }

  async findAll() {
    return this.prisma.proyecto.findMany({
      include: {
        departamento: true,
        ciudad: true,
        proyectoMateriales: {
          include: {
            material: {
              include: {
                unidad: true,
              },
            },
          },
        },
      },
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const proyecto = await this.prisma.proyecto.findUnique({
      where: { id },
      include: {
        departamento: true,
        ciudad: true,
        proyectoMateriales: {
          include: {
            material: {
              include: {
                unidad: true,
              },
            },
          },
        },
      },
    });

    if (!proyecto) {
      throw new NotFoundException(`Proyecto con ID ${id} no encontrado`);
    }

    return proyecto;
  }

  async update(id: number, updateProyectoDto: UpdateProyectoDto) {
    await this.findOne(id);

    return this.prisma.proyecto.update({
      where: { id },
      data: updateProyectoDto,
      include: {
        departamento: true,
        ciudad: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.proyecto.delete({
      where: { id },
    });
  }

  async asignarMaterial(proyectoId: number, asignarMaterialDto: AsignarMaterialDto) {
    const proyecto = await this.findOne(proyectoId);
    
    try {
      return await this.prisma.proyectoMaterial.create({
        data: {
          proyectoId,
          materialId: asignarMaterialDto.materialId,
          cantidad: asignarMaterialDto.cantidad,
        },
        include: {
          material: {
            include: {
              unidad: true,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('El material ya está asignado a este proyecto');
      }
      throw error;
    }
  }

  async actualizarCantidadMaterial(proyectoId: number, materialId: number, cantidad: number) {
    const proyectoMaterial = await this.prisma.proyectoMaterial.findUnique({
      where: {
        proyectoId_materialId: {
          proyectoId,
          materialId,
        },
      },
    });

    if (!proyectoMaterial) {
      throw new NotFoundException('Material no asignado a este proyecto');
    }

    return this.prisma.proyectoMaterial.update({
      where: {
        proyectoId_materialId: {
          proyectoId,
          materialId,
        },
      },
      data: { cantidad },
      include: {
        material: {
          include: {
            unidad: true,
          },
        },
      },
    });
  }

  async removerMaterial(proyectoId: number, materialId: number) {
    const proyectoMaterial = await this.prisma.proyectoMaterial.findUnique({
      where: {
        proyectoId_materialId: {
          proyectoId,
          materialId,
        },
      },
    });

    if (!proyectoMaterial) {
      throw new NotFoundException('Material no asignado a este proyecto');
    }

    return this.prisma.proyectoMaterial.delete({
      where: {
        proyectoId_materialId: {
          proyectoId,
          materialId,
        },
      },
    });
  }

  async getReporteMateriales(proyectoId: number) {
    const proyecto = await this.findOne(proyectoId);

    const materiales = await this.prisma.proyectoMaterial.findMany({
      where: { proyectoId },
      include: {
        material: {
          include: {
            unidad: true,
          },
        },
      },
    });

    const costoTotal = materiales.reduce((total, pm) => {
      return total + (parseFloat(pm.material.precio.toString()) * parseFloat(pm.cantidad.toString()));
    }, 0);

    return {
      proyecto: {
        id: proyecto.id,
        nombre: proyecto.nombre,
        departamento: proyecto.departamento.nombre,
        ciudad: proyecto.ciudad.nombre,
      },
      materiales: materiales.map(pm => ({
        id: pm.material.id,
        codigo: pm.material.codigo,
        descripcion: pm.material.descripcion,
        unidad: pm.material.unidad.simbolo,
        precioUnitario: parseFloat(pm.material.precio.toString()),
        cantidad: parseFloat(pm.cantidad.toString()),
        subtotal: parseFloat(pm.material.precio.toString()) * parseFloat(pm.cantidad.toString()),
      })),
      costoTotal,
    };
  }
}