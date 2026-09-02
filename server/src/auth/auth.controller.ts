import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService, RegisterDto, LoginDto } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new traveler or tour operator account' })
  @ApiResponse({ status: 201, description: 'Account registered and token issued' })
  @ApiResponse({ status: 400, description: 'Validation error or existing phone/email' })
  async register(@Body() dto: RegisterDto) {
    const data = await this.authService.register(dto);
    return {
      success: true,
      message: 'Account registered successfully',
      data
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login using phone or email and password' })
  @ApiResponse({ status: 200, description: 'Authenticated successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto) {
    const data = await this.authService.login(dto);
    return {
      success: true,
      message: 'Logged in successfully',
      data
    };
  }

  @Post('send-otp')
  @ApiOperation({ summary: 'Send 4-digit SMS OTP to an Ethiopian phone number' })
  @ApiResponse({ status: 200, description: 'SMS OTP dispatched (Test code: 8492)' })
  async sendOtp(@Body('phone') phone: string) {
    return await this.authService.sendOtp(phone || '+251 911 482910');
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify SMS OTP code and auto-authenticate traveler' })
  @ApiResponse({ status: 201, description: 'OTP verified, session token issued' })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP code' })
  async verifyOtp(@Body('phone') phone: string, @Body('code') code: string) {
    const data = await this.authService.verifyOtp(phone, code);
    return {
      success: true,
      message: 'Phone verified and authenticated',
      data
    };
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch currently authenticated profile via Bearer session token' })
  @ApiResponse({ status: 200, description: 'User profile with role permissions' })
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
