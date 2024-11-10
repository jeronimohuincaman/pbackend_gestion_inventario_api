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
  create(@Body() createProductoDto: CreateProductoDto) {
    return this._productosService.create(createProductoDto);
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
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductoDto: UpdateProductoDto
  ) {
    return this._productosService.update(id, updateProductoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this._productosService.remove(id);
  }
}
