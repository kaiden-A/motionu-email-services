import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow cookies to be sent back and forth if needed
  });

  app.setGlobalPrefix('api/v1')
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
