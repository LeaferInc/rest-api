import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import "reflect-metadata";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Main");
  const port = process.env.PORT || 3000;
  logger.log(`Application started in ${process.env.NODE_ENV} with the port ${port}`);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.enableCors();
  await app.listen(port);
}
bootstrap();
