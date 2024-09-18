import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'https://neoron-aeroporto.netlify.app', // Permitir apenas essa origem
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir o uso de cookies, se necessário
  });
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
}
bootstrap();
