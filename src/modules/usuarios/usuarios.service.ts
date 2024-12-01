import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PaginatorDto } from 'src/common/paginator.dto';

@Injectable()
export class UsuariosService {
  constructor(
    private readonly _prismaService: PrismaService
  ) { }

  async create(createUsuarioDto: CreateUsuarioDto) {
    try {

      const existe_usuario = await this._prismaService.usuario.findFirst({
        where: {
          email: createUsuarioDto.email,
          activo: true
        }
      });

      if (existe_usuario) return new InternalServerErrorException('Ya existe un usuario con ese email');

      const nuevoUsuario = await this._prismaService.usuario.create({
        data: createUsuarioDto
      });
      return nuevoUsuario;
    } catch (error) {
      throw new NotFoundException('Error al crear el usuario: ' + error);
    }
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
      where: { activo: true }
    })

    return {
      data,
      metadata: metadata ? metadata : { totalRecords: totalPages },
    };
  }

  async findOne(id: number) {
    const usuarios = await this._prismaService.usuario.findFirst({
      where: { idusuario: id, activo: true }
    });

    if (!usuarios) throw new NotFoundException('No se encontraron usuarios');

    return usuarios;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    const existe = await this._prismaService.usuario.findUnique({
      where: { idusuario: id, activo: true }
    });

    if (!existe) throw new NotFoundException(`No se encontro el usuario ${id}`);

    const usuarioActualizado = this._prismaService.usuario.update({
      where: { idusuario: id },
      data: updateUsuarioDto
    });

    return usuarioActualizado;
  }

  async remove(id: number) {
    const existe = await this._prismaService.usuario.findUnique({
      where: { idusuario: id }
    });

    if (!existe) throw new NotFoundException(`No se encontro el usuario ${id}`);

    const result = await this._prismaService.usuario.update({
      where: { idusuario: id },
      data: { activo: false }
    });

    return result;
  }
}
