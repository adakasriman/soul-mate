import { schema } from "@database/schema";
import { Inject, Injectable } from "@nestjs/common";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

@Injectable()
export class AuthRepository {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  findByEmail(email: string) {
    return this.db.query.users.findFirst({
      where: (u: { email: any; }, { eq }: any) => eq(u.email, email),
    });
  };

  createUser(data: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) {
    return this.db.insert(users).values(data).returning();
  }
}
