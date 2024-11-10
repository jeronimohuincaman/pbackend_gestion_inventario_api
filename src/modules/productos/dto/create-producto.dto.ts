import { IsNumber, IsString } from "class-validator";

export class CreateProductoDto {
    @IsString()
    codigo_interno: string;

    @IsString()
    descripcion: string;

    @IsNumber()
    precio: number;

    @IsNumber()
    cantidad: number;
}
