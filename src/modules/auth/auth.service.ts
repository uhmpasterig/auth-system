import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '@modules/database';
import { RegisterDto, LoginDto } from '../../dtos';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@modules/jwt';
import { UserFetchingService } from '@/modules/user/services/users-fetching.service';

@Injectable()
export class AuthService {
  private HASHING_OPTIONS = {
    type: argon2.argon2id,
    memoryCost: 4096,
    timeCost: 4,
    parallelism: 2,
    saltLength: 16,
    secret: Buffer.from(this.configService.get<string>('ARGON2_SECRET')),
    salt: Buffer.from(this.configService.get<string>('ARGON2_SALT')),
  };

  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private userFetchingService: UserFetchingService,
  ) {}

  private async getTokenForUser(id: number) {
    const payload = { sub: id };
    const token = await this.jwtService.signToken(payload);
    return { token };
  }

  async register(registerDto: RegisterDto) {
    const { email, name, password } = registerDto;
    const hashedPassword = await argon2.hash(password, this.HASHING_OPTIONS);
    if (await this.userFetchingService.getUserByEmail(email)) {
      throw new BadRequestException('Email already exists');
    }
    if (await this.userFetchingService.getUserByName(name)) {
      throw new BadRequestException('Username already exists');
    }

    const user = await this.prismaService.handleOperation(
      this.prismaService.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      }),
    );

    return this.getTokenForUser(user.id);
  }

  async login(loginDto: LoginDto) {
    const { email, name, password } = loginDto;
    const user = await this.userFetchingService.getUserByEmailOrName({
      email,
      name,
    });

    Object.freeze(user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await argon2.verify(
      user.password,
      password,
      this.HASHING_OPTIONS,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.getTokenForUser(user.id);
  }
}
