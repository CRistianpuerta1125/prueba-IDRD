import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class CreateProyectoDto {
  @ApiProperty({ description: 'Nombre del proyecto', example: 'Construcción Edificio Central' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'ID del departamento', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  departamentoId: number;

  @ApiProperty({ description: 'ID de la ciudad', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  ciudadId: number;
}