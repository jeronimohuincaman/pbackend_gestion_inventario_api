import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioDto } from './create-usuario.dto';
import { IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    idusuario: number;

    @IsBoolean()
    @Type(() => Boolean)
    activo?: boolean;
}
