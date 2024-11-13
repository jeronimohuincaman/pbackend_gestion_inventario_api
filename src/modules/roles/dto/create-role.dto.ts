import { IsBoolean, IsString } from "class-validator";

export class CreateRoleDto {

    @IsString()
    descripcion: string;

    @IsBoolean()
    superadmin: boolean;

    @IsBoolean()
    alta: boolean;

    @IsBoolean()
    baja: boolean;

    @IsBoolean()
    modificacion: boolean;

    @IsBoolean()
    consulta: boolean;

    @IsBoolean()
    activo: boolean;
}
