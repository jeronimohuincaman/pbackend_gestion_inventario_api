import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsBoolean, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    idrol: number;
    
    @IsBoolean()
    @Type(() => Boolean)
    activo?: boolean;
}
