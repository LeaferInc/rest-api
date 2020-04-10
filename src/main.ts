import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger("Main");
  const port = process.env.PORT || 3000;
  logger.log(`Application started in ${process.env.NODE_ENV} with the port ${port}`);

  app.enableCors();
  await app.listen(port);
}
bootstrap();
