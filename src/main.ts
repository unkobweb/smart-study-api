import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { json, urlencoded } from 'express';
import { ExcludeRawBodyMiddleware } from './middleware/excluse-raw-body.middleware';

async function bootstrap() {
  console.log(process.env.NODE_ENV)
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });
  // log each request done
  app.use((req, res, next) => {
    console.log(req.method, req.url)
    next()
  })
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS'
  })
  app.use(ExcludeRawBodyMiddleware)

  app.useGlobalPipes(new ValidationPipe({transform: true}))
  await app.listen(8080);
}
bootstrap();
