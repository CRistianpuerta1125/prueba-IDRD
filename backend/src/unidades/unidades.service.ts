import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';

@Injectable()
export class UnidadesService {
  constructor(private prisma: PrismaService) {}

  async create(createUnidadDto: CreateUnidadDto) {
    try {
      return await this.prisma.unidad.create({
        data: createUnidadDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Ya existe una unidad con ese nombre');
      }
      throw error;
    }
  }

  async findAll() {
    return this.prisma.unidad.findMany({
      orderBy: { nombre: 'asc' },
    });
  }

  async findOne(id: number) {
    const unidad = await this.prisma.unidad.findUnique({
      where: { id },
    });

    if (!unidad) {
      throw new NotFoundException(`Unidad con ID ${id} no encontrada`);
    }

    return unidad;
  }

  async update(id: number, updateUnidadDto: UpdateUnidadDto) {
    await this.findOne(id);

    try {
      return await this.prisma.unidad.update({
        where: { id },
        data: updateUnidadDto,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Ya existe una unidad con ese nombre');
      }
      throw error;
    }
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.unidad.delete({
      where: { id },
    });
  }
}