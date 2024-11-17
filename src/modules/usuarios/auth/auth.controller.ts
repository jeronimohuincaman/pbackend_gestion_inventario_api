import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) return { message: 'Credenciales invalidas' };

    return this.authService.login(user);
  }

  //   @UseGuards(JwtAuthGuard)
  //   @Get('perfil')
  //   getPerfil(@Request() req) {
  //     return 'lindo';
  //   }
}
