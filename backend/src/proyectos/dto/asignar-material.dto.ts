import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class AsignarMaterialDto {
  @ApiProperty({ description: 'ID del material', example: 1 })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  materialId: number;

  @ApiProperty({ description: 'Cantidad del material', example: 10.5 })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => parseFloat(value))
  cantidad: number;
}