import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@Injectable()
export class MaterialesService {
  constructor(private prisma: PrismaService) {}

  async create(createMaterialDto: CreateMaterialDto) {
    try {
      return await this.prisma.material.create({
        data: createMaterialDto,
        include: {
          unidad: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Ya existe un material con ese código');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.material.findMany({
      include: {
        unidad: true,
      },
      orderBy: { codigo: 'asc' },
    });
  }

  async findOne(id: number) {
    const material = await this.prisma.material.findUnique({
      where: { id },
      include: {
        unidad: true,
      },
    });

    if (!material) {
      throw new NotFoundException(`Material con ID ${id} no encontrado`);
    }

    return material;
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    await this.findOne(id);

    try {
      return await this.prisma.material.update({
        where: { id },
        data: updateMaterialDto,
        include: {
          unidad: true,
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Ya existe un material con ese código');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.material.delete({
      where: { id },
    });
  }
}