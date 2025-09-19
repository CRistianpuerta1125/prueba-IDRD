import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUnidadDto {
  @ApiProperty({ description: 'Nombre de la unidad', example: 'Metro cuadrado' })
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Símbolo de la unidad', example: 'M²' })
  @IsNotEmpty()
  @IsString()
  simbolo: string;
}