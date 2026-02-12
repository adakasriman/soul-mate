import {
  Injectable,
  Inject,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { users } from '@database/schema/user.schema';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { schema } from '@database/schema';

@Injectable()
export class AuthService {
  constructor(
    @Inject('DRIZZLE')
    private readonly db: NodePgDatabase<typeof schema>,
  ) {}

  // 🔹 REGISTER
  async register(dto: RegisterDto) {
    const { name, email, password } = dto;

    const existingUser = await this.db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [newUser] = await this.db
      .insert(users)
      .values({
        name,
        email,
        password: hashedPassword,
        role: 'customer',
      })
      .returning();

    return {
      message: 'User registered successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  }

  // 🔹 LOGIN
  async login(email: string, password: string) {
    const user = await this.db.query.users.findFirst({
      where: (u, { eq }) => eq(u.email, email),
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    };
  }
}
