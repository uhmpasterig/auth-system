import { AuthService } from './auth.service';
import { Controller, Post, Body } from '@nestjs/common';
import { RegisterDto, LoginDto } from '@dtos/index';
import { Public } from '@decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @Public()
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
