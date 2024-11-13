import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorDto } from 'src/common/paginator.dto';

@Injectable()
export class ProductosService {
  constructor(
    private readonly _prismaService: PrismaService
  ) { }

  async create(createProductoDto: CreateProductoDto) {
    try {
      const nuevoProducto = await this._prismaService.producto.create({
        data: createProductoDto
      });

      return nuevoProducto;
    } catch (error) {
      throw new InternalServerErrorException(`Error al crear producto ${error}`);
    }
  }

  async findAll(paginator: PaginatorDto) {
    const { page, perPage } = paginator || {};
    let metadata;

    const totalRecords = await this._prismaService.producto.count();
    const lastPage = Math.ceil(totalRecords / perPage);

    if (page && perPage) {
      metadata = {
        page,
        totalRecords,
        lastPage
      };
    }

    const data = await this._prismaService.producto.findMany({
      skip: page ? (page - 1) * perPage : undefined,
      take: perPage ? perPage : undefined,
      where: { activo: true }
    });

    return {
      data,
      metadata: metadata ? metadata : { totalRecords },
    };
  }

  async findOne(id: number) {
    const producto = await this._prismaService.producto.findFirst({
      where: { idproducto: id, activo: true }
    });

    if (!producto) throw new NotFoundException('Producto no encontrado');

    return producto;
  }

  async update(id: number, updateProductoDto: UpdateProductoDto) {
    const existe = await this._prismaService.producto.findUnique({
      where: { idproducto: id, activo: true }
    });

    if (!existe) throw new NotFoundException(`No se encontro el producto ${id}`);

    const productoActualizado = this._prismaService.producto.update({
      where: { idproducto: id },
      data: updateProductoDto
    });

    return productoActualizado;

  }

  async remove(id: number) {
    const existe = await this._prismaService.producto.findUnique({
      where: { idproducto: id }
    });

    if (!existe) throw new NotFoundException(`No se encontro el producto ${id}`);

    const result = await this._prismaService.producto.update({
      where: { idproducto: id },
      data: { activo: false }
    });

    return result;
  }
}
