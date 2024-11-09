import { PartialType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRoleDto extends PartialType(CreateRoleDto) {

    @IsNumber()
    @IsPositive()
    @Type(() => Number)
    idrol: number;

}
