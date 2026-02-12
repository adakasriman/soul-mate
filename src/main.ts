import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { ValidationPipe } from '@nestjs/common';
import { sql } from 'drizzle-orm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Global API prefix
  app.setGlobalPrefix('api/v1');

  // ✅ Enable CORS (important for frontend apps)
  app.enableCors();

  // ✅ Enable DTO validation globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown properties
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // ✅ Get Drizzle instance
  const db = app.get<NodePgDatabase>('DRIZZLE');

  try {
    // Better Drizzle-safe query
    await db.execute(sql`SELECT 1`);
    console.log('✅ Database Connected Successfully');
  } catch (error) {
    console.error('❌ Database Connection Failed');
    console.error(error);
    process.exit(1);
  }

  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log(`🚀 Server running at http://localhost:${port}/api/v1`);
}

bootstrap();
