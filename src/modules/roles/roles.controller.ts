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
  create(@Body() createRoleDto: CreateRoleDto) {
    return this._rolesService.create(createRoleDto);
  }

  @Get()
  async findAll(@Query() paginator: PaginatorDto, @Res() response: Response) {
    const result = await this._rolesService.findAll(paginator);
    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Aprobado' });
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response
  ) {
    const result = await this._rolesService.findOne(id);

    response.status(HttpStatus.OK).json({ ok: true, result, msg: 'Aprobado' });
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this._rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this._rolesService.remove(+id);
  }
}
