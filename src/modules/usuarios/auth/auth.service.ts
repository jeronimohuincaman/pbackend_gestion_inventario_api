import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly _prismaService: PrismaService,
  ) {}

  login(credenciales) {
    const payload = {
      email: credenciales.email,
      password: credenciales.password,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    // TODO: Desencriptian password hasheada

    const result = await this._prismaService.usuario.findUnique({
      where: { email: email },
    });

    // Verifica si el usuario no existe
    if (!result) {
      throw new NotFoundException('No se encontró el usuario');
    }

    if (email === result.email && password === result.password) {
      return result;
    }

    return null;
  }
}
