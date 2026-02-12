import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 👇 get drizzle instance
  const db = app.get<NodePgDatabase>('DRIZZLE');

  try {
    await db.execute('SELECT 1');
    console.log('✅ Database Connected Successfully');
  } catch (error) {
    console.error('❌ Database Connection Failed');
    console.error(error);
    process.exit(1);
  }
  const port = process.env.PORT ?? 3000;

  await app.listen(port);

  console.log(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
