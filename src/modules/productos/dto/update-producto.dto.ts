import { PartialType } from '@nestjs/mapped-types';
import { CreateProductoDto } from './create-producto.dto';
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductoDto extends PartialType(CreateProductoDto) {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    idproducto: number;
}
