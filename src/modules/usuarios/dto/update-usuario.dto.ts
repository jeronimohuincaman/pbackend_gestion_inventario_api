import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    idusuario: number;
}
