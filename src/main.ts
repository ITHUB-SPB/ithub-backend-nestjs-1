import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule, ObserveInstrument } from './app.module.js';
import { timingMiddleware } from './common/middleware/timing.middleware.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
    routeConflictPolicy: { duplicate: 'error', shadow: 'error' },
    routeResolutionStrategy: 'specificity',
  });

  const config = new DocumentBuilder()
    .setTitle('Animals')
    .setDescription('Документация')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  app.use(timingMiddleware)

  await app.listen(process.env.PORT ?? 3000);
  console.log('http://localhost:3000')
}

await bootstrap();
