import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  // Swagger OpenAPI Documentation
  const swaggerConfig = new DocumentBuilder()
    .setTitle('GuzoTribe Ethiopian Adventure API')
    .setDescription('Enterprise NestJS & PostgreSQL API for 28-Seat Toyota Coaster Booking, Telebirr Group Split Payments, Ministry of Tourism Highway Manifests, and CASL RBAC')
    .setVersion('1.0')
    .addTag('Auth', 'SMS OTP verification, Registration & Bearer Session Tokens')
    .addTag('Trips', 'Expedition catalog, search filters & live Coaster occupied seats')
    .addTag('Bookings', '28-Seat bus seat selection & Addis boarding hubs')
    .addTag('GroupSplit', '60-minute TTL crew seat locks & Telebirr split payments')
    .addTag('Escrow', 'Telebirr USSD push callbacks & 8% platform fee payout settlements')
    .addTag('Manifest', 'Ministry of Tourism (MoT) passenger clearance sheets')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Enter your GuzoTribe token (e.g. gz_tok_...)'
    })
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const port = process.env.PORT || 5000;
  await app.listen(port);

  logger.log(`🚀 GuzoTribe NestJS & PostgreSQL Backend listening on http://localhost:${port}/api`);
  logger.log(`📚 Swagger OpenAPI Docs: http://localhost:${port}/api/docs`);
  logger.log(`📌 Trips API:            http://localhost:${port}/api/trips`);
  logger.log(`📌 Bookings API:         http://localhost:${port}/api/bookings`);
  logger.log(`📌 Group Split API:      http://localhost:${port}/api/group-split`);
  logger.log(`📌 Escrow API:           http://localhost:${port}/api/escrow`);
  logger.log(`📌 MoT Manifest API:     http://localhost:${port}/api/manifest/wenchi-crater-lake-day-hike`);
}

bootstrap();
