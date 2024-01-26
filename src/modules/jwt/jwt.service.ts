import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService as NestJwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtService {
  constructor(
    private nestJwtService: NestJwtService,
    private configService: ConfigService,
  ) {}

  async extractTokenFromHeader(request: Request): Promise<string | undefined> {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  async getPayloadFromToken(token: string): Promise<any> {
    const payload = await this.nestJwtService.verifyAsync(token, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    return payload;
  }

  async getPayloadFromRequest(request: Request): Promise<any> {
    const token = await this.extractTokenFromHeader(request);
    const payload = await this.getPayloadFromToken(token);
    return payload;
  }

  async signToken(payload: any): Promise<string> {
    const token = await this.nestJwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    return token;
  }
}
