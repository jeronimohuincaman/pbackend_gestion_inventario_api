import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorDto } from 'src/common/paginator.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly _prismaService: PrismaService
  ) { }

  create(createUsuarioDto: CreateUsuarioDto) {
    return 'This action adds a new usuario';
  }

  async findAll(paginator: PaginatorDto) {
    const { page, perPage } = paginator || {};
    let metadata;

    const totalPages = await this._prismaService.usuario.count();

    const lastPage = Math.ceil(totalPages / perPage);

    if (page && perPage) {
      metadata = {
        page,
        totalPages,
        lastPage
      }
    }

    const data = await this._prismaService.usuario.findMany({
      skip: page ? (page - 1) * perPage : undefined,
      take: perPage ? perPage : undefined,
    })

    return {
      data,
      metadata: metadata ? metadata : { totalRecords: totalPages },
    };
  }

  async findOne(id: number) {
    const usuarios = await this._prismaService.usuario.findFirst({
      where: { idusuario: id }
    });

    if (!usuarios) throw new NotFoundException('No se encontraron usuarios');

    return usuarios;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
