import * as health from '@cloudnative/health-connect';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';
import * as cors from 'cors';
import * as express from 'express';
import * as morgan from 'morgan';

import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';

export async function bootstrap(AppModule): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);
  const healthCheck = new health.HealthChecker();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  // global nest setup
  useContainer(app.select(AppModule), { fallbackOnErrors: true }); // refer: https://github.com/typestack/class-validator#using-service-container
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  app.use('/live', health.LivenessEndpoint(healthCheck));
  app.use('/ready', health.ReadinessEndpoint(healthCheck));
  app.use('/healthz', health.HealthEndpoint(healthCheck));

  // Starts listening to shutdown hooks
  app.enableShutdownHooks();

  return app;
}
