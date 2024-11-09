import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PaginatorDto } from 'src/common/paginator.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() paginator: PaginatorDto) {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.rolesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.rolesService.remove(+id);
  }
}
