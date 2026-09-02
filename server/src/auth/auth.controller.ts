import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { AuthService, RegisterDto, LoginDto } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const data = await this.authService.register(dto);
    return {
      success: true,
      message: 'Account registered successfully',
      data
    };
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return {
      success: true,
      message: 'Logged in successfully',
      data
    };
  }

  @Post('send-otp')
  async sendOtp(@Body('phone') phone: string) {
    return await this.authService.sendOtp(phone || '+251 911 482910');
  }

  @Post('verify-otp')
  async verifyOtp(@Body('phone') phone: string, @Body('code') code: string) {
    const data = await this.authService.verifyOtp(phone, code);
    return {
      success: true,
      message: 'Phone verified and authenticated',
      data
    };
  }

  @Get('me')
  async getMe(@Headers('authorization') authHeader?: string) {
    let userId: string | undefined;
    if (authHeader && authHeader.startsWith('Bearer gz_tok_')) {
      const parts = authHeader.split('_');
      if (parts.length >= 3) {
        userId = `usr-${parts[2]}`;
      }
    }
    const user = await this.authService.getMe(userId);
    return {
      success: true,
      data: user
    };
  }
}
