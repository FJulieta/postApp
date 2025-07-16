import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  // Crea la aplicación Nest con el módulo principal
  const app = await NestFactory.create(AppModule);

  // Habilita CORS para permitir llamadas desde el frontend
  app.enableCors();

  // Usa pipes globales para validar automáticamente los DTOs
  app.useGlobalPipes(new ValidationPipe());

  // Arranca el servidor en el puerto 3000
  await app.listen(3001);
}
bootstrap();
