import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorDto } from 'src/common/paginator.dto';

@Injectable()
export class ProductosService {
  constructor(
    private readonly _prismaService: PrismaService
  ) { }

  create(createProductoDto: CreateProductoDto) {
    return 'This action adds a new producto';
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
    });

    return {
      data,
      metadata: metadata ? metadata : { totalRecords },
    };
  }

  async findOne(id: number) {
    const producto = await this._prismaService.producto.findFirst({
      where: { idproducto: id }
    });

    if (!producto) throw new NotFoundException('Producto no encontrado');

    return producto;
  }

  update(id: number, updateProductoDto: UpdateProductoDto) {
    return `This action updates a #${id} producto`;
  }

  remove(id: number) {
    return `This action removes a #${id} producto`;
  }
}
