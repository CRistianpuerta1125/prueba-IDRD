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
import { UnidadesService } from './unidades.service';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { UpdateUnidadDto } from './dto/update-unidad.dto';

@ApiTags('unidades')
@Controller('unidades')
export class UnidadesController {
  constructor(private readonly unidadesService: UnidadesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva unidad' })
  @ApiResponse({ status: 201, description: 'Unidad creada exitosamente' })
  @ApiResponse({ status: 409, description: 'Ya existe una unidad con ese nombre' })
  create(@Body() createUnidadDto: CreateUnidadDto) {
    return this.unidadesService.create(createUnidadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las unidades' })
  @ApiResponse({ status: 200, description: 'Lista de unidades' })
  findAll() {
    return this.unidadesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una unidad por ID' })
  @ApiResponse({ status: 200, description: 'Unidad encontrada' })
  @ApiResponse({ status: 404, description: 'Unidad no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.unidadesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una unidad' })
  @ApiResponse({ status: 200, description: 'Unidad actualizada exitosamente' })
  @ApiResponse({ status: 404, description: 'Unidad no encontrada' })
  @ApiResponse({ status: 409, description: 'Ya existe una unidad con ese nombre' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUnidadDto: UpdateUnidadDto,
  ) {
    return this.unidadesService.update(id, updateUnidadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una unidad' })
  @ApiResponse({ status: 200, description: 'Unidad eliminada exitosamente' })
  @ApiResponse({ status: 404, description: 'Unidad no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.unidadesService.remove(id);
  }
}