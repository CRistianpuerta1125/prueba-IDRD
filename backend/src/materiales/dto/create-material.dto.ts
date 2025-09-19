import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateMaterialDto {
  @ApiProperty({ description: 'Código único del material', example: 'MAT001' })
  @IsNotEmpty()
  @IsString()
  codigo: string;

  @ApiProperty({ description: 'Descripción del material', example: 'Cemento Portland' })
  @IsNotEmpty()
  @IsString()
  descripcion: string;

  @ApiProperty({ description: 'ID de la unidad', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  unidadId: number;

  @ApiProperty({ description: 'Precio del material', example: 25000.50 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  precio: number;
}