import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UnidadesModule } from './unidades/unidades.module';
import { MaterialesModule } from './materiales/materiales.module';
import { ProyectosModule } from './proyectos/proyectos.module';
import { UbicacionesModule } from './ubicaciones/ubicaciones.module';

@Module({
  imports: [
    PrismaModule,
    UnidadesModule,
    MaterialesModule,
    ProyectosModule,
    UbicacionesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
