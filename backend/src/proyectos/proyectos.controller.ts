import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ProyectosService } from './proyectos.service';
import { CreateProyectoDto } from './dto/create-proyecto.dto';
import { UpdateProyectoDto } from './dto/update-proyecto.dto';
import { AsignarMaterialDto } from './dto/asignar-material.dto';

@ApiTags('proyectos')
@Controller('proyectos')
export class ProyectosController {
  constructor(private readonly proyectosService: ProyectosService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo proyecto' })
  @ApiResponse({ status: 201, description: 'Proyecto creado exitosamente' })
  create(@Body() createProyectoDto: CreateProyectoDto) {
    return this.proyectosService.create(createProyectoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los proyectos' })
  @ApiResponse({ status: 200, description: 'Lista de proyectos' })
  findAll() {
    return this.proyectosService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un proyecto por ID' })
  @ApiResponse({ status: 200, description: 'Proyecto encontrado' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProyectoDto: UpdateProyectoDto,
  ) {
    return this.proyectosService.update(id, updateProyectoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un proyecto' })
  @ApiResponse({ status: 200, description: 'Proyecto eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.remove(id);
  }

  @Post(':id/materiales')
  @ApiOperation({ summary: 'Asignar material a un proyecto' })
  @ApiResponse({ status: 201, description: 'Material asignado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  @ApiResponse({ status: 409, description: 'El material ya está asignado a este proyecto' })
  asignarMaterial(
    @Param('id', ParseIntPipe) id: number,
    @Body() asignarMaterialDto: AsignarMaterialDto,
  ) {
    return this.proyectosService.asignarMaterial(id, asignarMaterialDto);
  }

  @Patch(':proyectoId/materiales/:materialId')
  @ApiOperation({ summary: 'Actualizar cantidad de material en proyecto' })
  @ApiResponse({ status: 200, description: 'Cantidad actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Material no asignado a este proyecto' })
  actualizarCantidadMaterial(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('materialId', ParseIntPipe) materialId: number,
    @Body('cantidad') cantidad: number,
  ) {
    return this.proyectosService.actualizarCantidadMaterial(proyectoId, materialId, cantidad);
  }

  @Delete(':proyectoId/materiales/:materialId')
  @ApiOperation({ summary: 'Remover material de proyecto' })
  @ApiResponse({ status: 200, description: 'Material removido exitosamente' })
  @ApiResponse({ status: 404, description: 'Material no asignado a este proyecto' })
  removerMaterial(
    @Param('proyectoId', ParseIntPipe) proyectoId: number,
    @Param('materialId', ParseIntPipe) materialId: number,
  ) {
    return this.proyectosService.removerMaterial(proyectoId, materialId);
  }

  @Get(':id/reporte')
  @ApiOperation({ summary: 'Obtener reporte de materiales del proyecto' })
  @ApiResponse({ status: 200, description: 'Reporte generado exitosamente' })
  @ApiResponse({ status: 404, description: 'Proyecto no encontrado' })
  getReporteMateriales(@Param('id', ParseIntPipe) id: number) {
    return this.proyectosService.getReporteMateriales(id);
  }
}