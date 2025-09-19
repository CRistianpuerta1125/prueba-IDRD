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
import { MaterialesService } from './materiales.service';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';

@ApiTags('materiales')
@Controller('materiales')
export class MaterialesController {
  constructor(private readonly materialesService: MaterialesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo material' })
  @ApiResponse({ status: 201, description: 'Material creado exitosamente' })
  @ApiResponse({ status: 409, description: 'Ya existe un material con ese código' })
  create(@Body() createMaterialDto: CreateMaterialDto) {
    return this.materialesService.create(createMaterialDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los materiales' })
  @ApiResponse({ status: 200, description: 'Lista de materiales' })
  findAll() {
    return this.materialesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un material por ID' })
  @ApiResponse({ status: 200, description: 'Material encontrado' })
  @ApiResponse({ status: 404, description: 'Material no encontrado' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.materialesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un material' })
  @ApiResponse({ status: 200, description: 'Material actualizado exitosamente' })
  @ApiResponse({ status: 404, description: 'Material no encontrado' })
  @ApiResponse({ status: 409, description: 'Ya existe un material con ese código' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMaterialDto: UpdateMaterialDto,
  ) {
    return this.materialesService.update(id, updateMaterialDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un material' })
  @ApiResponse({ status: 200, description: 'Material eliminado exitosamente' })
  @ApiResponse({ status: 404, description: 'Material no encontrado' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.materialesService.remove(id);
  }
}