import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import "reflect-metadata";
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  /**
   * Swagger
   */

  if(process.env.NODE_ENV === 'development') {
      const options = new DocumentBuilder()
      .setTitle('Leafer')
      .setDescription('Leafer API')
      .setVersion(process.env.npm_package_version || '1.0')
      .addBearerAuth()
      // .addTag('cats')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }

  /**
   * Other
   */

  const logger = new Logger("Main");
  const port = process.env.PORT || 3000;
  logger.log(`Application started in ${process.env.NODE_ENV} with the port ${port}`);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true
    }),
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );

  app.enableCors();
  await app.listen(port);
}
bootstrap();
