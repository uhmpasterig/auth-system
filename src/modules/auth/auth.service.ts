import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@modules/database';
import { RegisterDto, LoginDto } from '@dtos/index';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@modules/jwt';
import { UsersFetchingService } from '@modules/user';
import { hash, verify } from '@utils/hashing';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private usersFetchingService: UsersFetchingService,
  ) {}

  private async getTokenForUser(id: number) {
    const payload = { sub: id };
    const token = await this.jwtService.signToken(payload);
    return { token };
  }

  async register(registerDto: RegisterDto) {
    const { email, name, password } = registerDto;
    const hashedPassword = await hash(password);
    if (await this.usersFetchingService.getUserByEmail(email)) {
      throw new BadRequestException('Email already exists');
    }
    if (await this.usersFetchingService.getUserByName(name)) {
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
    const user = await this.usersFetchingService.getUserByEmailOrName({
      email,
      name,
    });

    Object.freeze(user);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await verify(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.getTokenForUser(user.id);
  }
}
