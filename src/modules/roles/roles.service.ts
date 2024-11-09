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

  create(createRoleDto: CreateRoleDto) {
    return 'This action adds a new role';
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
    })

    return {
      data,
      metadata: metadata ? metadata : { totalRecords: totalPages },
    };
  }

  async findOne(id: number) {
    const roles = await this._prismaService.rol.findFirst({
      where: { idrol: id }
    });

    if (!roles) throw new NotFoundException('No se encontraron roles');

    return roles;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
