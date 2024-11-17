import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(credenciales) {
    const payload = {
      email: credenciales.email,
      password: credenciales.password,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  validateUser(email: string, password: string): any {
    // TODO: Desencriptian password hasheada
    // TODO: Buscar en la BD si existe el usuario

    const user = { idusuario: 1, email: 'lucas@gmail.com', password: '12345' };
    if (email === user.email && password === user.password) {
      return user;
    }

    return null;
  }
}
