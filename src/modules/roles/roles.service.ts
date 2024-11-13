import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorDto } from 'src/common/paginator.dto';

@Injectable()
export class RolesService {
  constructor(
    private readonly _prismaService: PrismaService
  ) { }

  async create(createRoleDto: CreateRoleDto) {
    try {
      const nuevoRol = await this._prismaService.rol.create({
        data: createRoleDto
      });
      return nuevoRol;
    } catch (error) {
      return new NotFoundException('Error al crear el rol');
    }

  }

  async findAll(paginator: PaginatorDto) {
    const { page, perPage } = paginator || {};
    let metadata;

    const totalPages = await this._prismaService.rol.count();

    const lastPage = Math.ceil(totalPages / perPage);

    if (page && perPage) {
      metadata = {
        page,
        totalPages,
        lastPage
      }
    }

    const data = await this._prismaService.rol.findMany({
      skip: page ? (page - 1) * perPage : undefined,
      take: perPage ? perPage : undefined,
      where: { activo: true }
    })

    return {
      data,
      metadata: metadata ? metadata : { totalRecords: totalPages },
    };
  }

  async findOne(id: number) {
    const roles = await this._prismaService.rol.findFirst({
      where: { idrol: id, activo: true }
    });

    if (!roles) throw new NotFoundException('No se encontraron roles');

    return roles;
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {

    const existe = await this._prismaService.rol.findUnique({
      where: { idrol: id, activo: true }
    });

    if (!existe) throw new NotFoundException(`No se encontro el rol ${id}`);

    const rolActualizado = this._prismaService.rol.update({
      where: { idrol: id },
      data: updateRoleDto
    });



    return rolActualizado;
  }

  async remove(id: number) {
    const existe = await this._prismaService.rol.findUnique({
      where: { idrol: id }
    });

    if (!existe) throw new NotFoundException(`No se encontro el rol ${id}`);

    const result = await this._prismaService.rol.update({
      where: { idrol: id },
      data: { activo: false }
    });

    return result;
  }
}
