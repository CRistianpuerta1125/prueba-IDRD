import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configurar CORS
  app.enableCors({
    origin: ['http://localhost:4200', 'http://127.0.0.1:4200'],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    credentials: true,
  });

  // Configurar validación global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('Sistema de Gestión de Materiales')
    .setDescription('API para gestionar materiales de construcción y proyectos')
    .setVersion('1.0')
    .addTag('unidades', 'Gestión de unidades de medida')
    .addTag('materiales', 'Gestión de materiales')
    .addTag('proyectos', 'Gestión de proyectos')
    .addTag('ubicaciones', 'Gestión de departamentos y ciudades')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
  console.log(`📚 Documentación Swagger disponible en http://localhost:${port}/api`);
  console.log(`🔗 CORS configurado para: http://localhost:4200`);
}
bootstrap();
