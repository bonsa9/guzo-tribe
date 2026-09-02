import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('GuzoTribeServer');
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend clients (Vite dev server and production domains)
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });

  // Global API route prefix: /api
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 5000;
  await app.listen(port);

  logger.log(`🚀 GuzoTribe NestJS & PostgreSQL Backend listening on http://localhost:${port}/api`);
  logger.log(`📌 Trips API:        http://localhost:${port}/api/trips`);
  logger.log(`📌 Bookings API:     http://localhost:${port}/api/bookings`);
  logger.log(`📌 Group Split API:  http://localhost:${port}/api/group-split`);
  logger.log(`📌 Escrow API:       http://localhost:${port}/api/escrow`);
  logger.log(`📌 MoT Manifest API: http://localhost:${port}/api/manifest/wenchi-crater-lake-day-hike`);
}

bootstrap();
