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
  async create(@Body() createUsuarioDto: CreateUsuarioDto, @Res() response: Response) {
    const result = await this._usuariosService.create(createUsuarioDto);

    return response.status(HttpStatus.CREATED).json({ ok: true, result, msg: 'Usuario creado con exito' });

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
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateUsuarioDto: UpdateUsuarioDto, @Res() response: Response) {
    const result = await this._usuariosService.update(id, updateUsuarioDto);

    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Usuario editado con exito' });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const result = await this._usuariosService.remove(id);

    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Usuario eliminado con exito' });
  }
}
