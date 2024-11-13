import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, Res, HttpStatus } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginatorDto } from 'src/common/paginator.dto';
import { Response } from 'express';

@Controller('roles')
export class RolesController {
  constructor(private readonly _rolesService: RolesService) { }

  @Post()
  async create(@Body() createRoleDto: CreateRoleDto, @Res() response: Response) {
    const result = await this._rolesService.create(createRoleDto);

    return response.status(HttpStatus.CREATED).json({ ok: true, result, msg: 'Rol creado con exito' });
  }

  @Get()
  async findAll(@Query() paginator: PaginatorDto, @Res() response: Response) {
    const result = await this._rolesService.findAll(paginator);
    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Roles obtenidos con exito' });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    const result = await this._rolesService.findOne(id);
    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Rol obtenido con exito' });
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateRoleDto: UpdateRoleDto, @Res() response: Response) {
    const result = await this._rolesService.update(id, updateRoleDto);

    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Rol editado con exito' });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() response: Response) {
    const result = await this._rolesService.remove(id);

    return response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Rol eliminado con exito' });
  }
}
