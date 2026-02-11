import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { ConfigService } from '@nestjs/config';
import { schema } from './schema';

export const DrizzleProvider = {
  provide: 'DRIZZLE',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const pool = new Pool({
      connectionString: configService.get<string>('DATABASE_URL'),
    });

    return drizzle(pool, { schema });
  },
};
