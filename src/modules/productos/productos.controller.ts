import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, Res, ParseIntPipe } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { CreateProductoDto } from './dto/create-producto.dto';
import { UpdateProductoDto } from './dto/update-producto.dto';
import { PaginatorDto } from 'src/common/paginator.dto';
import { Response } from 'express';

@Controller('productos')
export class ProductosController {
  constructor(private readonly _productosService: ProductosService) { }

  @Post()
  async create(@Body() createProductoDto: CreateProductoDto, @Res() response: Response) {
    const result = await this._productosService.create(createProductoDto);
    return response.status(HttpStatus.CREATED).json({ ok: true, result, msg: 'Producto creado con exito' });
  }

  @Get()
  async findAll(@Query() paginator: PaginatorDto, @Res() response: Response) {
    const result = await this._productosService.findAll(paginator);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Aprobado' });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    const result = await this._productosService.findOne(id);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Aprobado' });
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto, @Res() response: Response) {
    const result = await this._productosService.update(id, updateProductoDto);

    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto editado con exito' });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const result = await this._productosService.remove(id);

    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Producto eliminado con exito' });
  }
}
