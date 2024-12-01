import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { envs } from 'src/configuration';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy/jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsuariosService } from '../usuarios.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: envs.jwt_seed,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, JwtStrategy, ConfigService, PrismaService, UsuariosService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
