import { IsBoolean, IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUsuarioDto {
    @IsNumber()
    idusuario: number;

    @IsString()
    nombre_completo: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;

    @IsNumber()
    idrol: number;

    @IsBoolean()
    activo: boolean;
}
