import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { roles, schema } from '../../database/schema';

@Injectable()
export class RolesRepository {
  constructor(@Inject('DRIZZLE') private readonly db: NodePgDatabase<typeof schema>) {}
  async create(name: string) {
    return this.db.insert(roles).values({ name }).returning();
  }
  async findByName(name: string) {
    return this.db.query.roles.findFirst({
      where: (role, { eq }) => eq(role.name, name),
    });
  }
  async findAll() {
    return this.db.select().from(roles);
  }
}
