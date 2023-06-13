import { NestFactory } from '@nestjs/core';
import { ScrapingBatchModule } from './scraping-batch.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(ScrapingBatchModule);
  await app.init();
}

bootstrap();
