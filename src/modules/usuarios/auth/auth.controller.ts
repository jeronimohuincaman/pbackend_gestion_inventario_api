import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CreateUsuarioDto } from '../dto/create-usuario.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
    @Res() response: Response,
  ) {
    const user = await this._authService.validateUser(
      body.email,
      body.password,
    );

    if (!user)
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ ok: false, user, msg: 'Credenciales invalidas' });

    const result = this._authService.login(user);

    return response
      .status(HttpStatus.OK)
      .json({ ok: true, result, msg: 'Logueo Exitoso' });
  }

  @Post('register')
  async register(@Body() body: CreateUsuarioDto, @Res() response: Response) {
    // TODO Validar que los campos del body sean del tipo correcto

    // Validar que el usuario NO exista en la BD, si existe, no volverlo a crear.
    const existeUsuario = await this._authService.findUsuarioByEmail(body);
    if(existeUsuario) return response.status(HttpStatus.CONFLICT).json({ ok: false,  msg: 'Ya existe un usuario creado con ese email' });

    // Encriptamos la contraseña
    body.password = await this._authService.hashPassword(body.password);

    // Registramos el usuario
    const result = await this._authService.register(body);
    if (!result) return response.status(HttpStatus.BAD_REQUEST).json({ ok: false,  result, msg: 'Fallo el registro del usuario' });

    return response.status(HttpStatus.CREATED).jsonp({ok: true, result: result, msg: 'El usuario se registro con exito'} )
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Get('perfil')
  //   getPerfil(@Request() req) {
  //     return 'lindo';
  //   }
}
