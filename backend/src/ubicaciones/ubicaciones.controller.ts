import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UbicacionesService } from './ubicaciones.service';

@ApiTags('ubicaciones')
@Controller('ubicaciones')
export class UbicacionesController {
  constructor(private readonly ubicacionesService: UbicacionesService) {}

  @Get('departamentos')
  @ApiOperation({ summary: 'Obtener todos los departamentos' })
  @ApiResponse({ status: 200, description: 'Lista de departamentos' })
  getDepartamentos() {
    return this.ubicacionesService.getDepartamentos();
  }

  @Get('departamentos/:id/ciudades')
  @ApiOperation({ summary: 'Obtener ciudades por departamento' })
  @ApiResponse({ status: 200, description: 'Lista de ciudades del departamento' })
  getCiudadesByDepartamento(@Param('id', ParseIntPipe) id: number) {
    return this.ubicacionesService.getCiudadesByDepartamento(id);
  }

  @Get('ciudades')
  @ApiOperation({ summary: 'Obtener todas las ciudades con sus departamentos' })
  @ApiResponse({ status: 200, description: 'Lista de todas las ciudades' })
  getAllCiudades() {
    return this.ubicacionesService.getAllCiudades();
  }
}