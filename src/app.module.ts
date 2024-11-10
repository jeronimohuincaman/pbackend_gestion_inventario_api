import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { RolesModule } from './modules/roles/roles.module';
import { UsuariosModule } from './modules/usuarios/usuarios.module';
import { ProductosModule } from './modules/productos/productos.module';

@Module({
  imports: [RolesModule, PrismaModule, UsuariosModule, ProductosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
