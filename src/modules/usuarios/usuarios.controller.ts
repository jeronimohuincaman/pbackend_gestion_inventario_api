import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpStatus, Res, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PaginatorDto } from 'src/common/paginator.dto';
import { Response } from 'express';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly _usuariosService: UsuariosService) { }

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this._usuariosService.create(createUsuarioDto);
  }

  @Get()
  async findAll(@Query() paginator: PaginatorDto, @Res() response: Response) {
    const result = await this._usuariosService.findAll(paginator);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Aprobado' });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    const result = await this._usuariosService.findOne(id);

    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Aprobado' });
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this._usuariosService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string,) {
    return this._usuariosService.remove(+id);
  }
}
