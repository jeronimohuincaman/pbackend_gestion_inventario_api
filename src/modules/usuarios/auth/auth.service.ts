import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { UsuariosService } from '../usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly _prismaService: PrismaService,
    private readonly _usuariosService: UsuariosService,
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

  async register(payload: CreateUsuarioDto) {
    return await this._usuariosService.create(payload);
  }

  async validateUser(email: string, password: string): Promise<any> {
    const result = await this._prismaService.usuario.findUnique({
      where: { email: email },
    });

    // Verifica si el usuario no existe
    if (!result) {
      throw new NotFoundException('No se encontró el usuario');
    }

    const isPasswordValid = await bcrypt.compare(password, result.password);

    if (!isPasswordValid) throw new UnauthorizedException('Credencial Incorrectas');

    if (email === result.email && isPasswordValid) {
      return result;
    }

    return null;
  }

  async findUsuarioByEmail(usuario: CreateUsuarioDto) {
    return await this._prismaService.usuario.findUnique({
      where: {
        email: usuario.email,
      },
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(12); // Genera el "salt"
    return await bcrypt.hash(password, salt); // Hashea la contraseña
  }
}
