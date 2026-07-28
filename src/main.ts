import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/express-api-reference';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: ['http://localhost:3000'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.setGlobalPrefix('api/v1')

  const config = new DocumentBuilder()
    .setTitle('Motion-U Email Services API')
    .setDescription('API documentation for Motion-U email services')
    .setVersion('1.0')
    .addBearerAuth()
    .addApiKey({ type: 'apiKey', name: 'motionu-api-key', in: 'header' }, 'motionu-api-key')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/docs', app, document);

  app.use('/api/v1/scalar', apiReference({
    spec: { content: document },
  }));

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
