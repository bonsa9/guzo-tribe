import { Controller, Post, Get, Body, Headers } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { 
  RegisterDto, 
  LoginDto, 
  SendOtpDto, 
  SendOtpResponseDto, 
  VerifyOtpDto, 
  AuthResponseDto, 
  UserProfileResponseDto 
} from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new traveler or tour operator account' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({ status: 201, description: 'Account registered and token issued', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Validation error or existing phone/email' })
  async register(@Body() dto: RegisterDto): Promise<AuthResponseDto> {
    const data = await this.authService.register(dto);
    return {
      success: true,
      message: 'Account registered successfully',
      data
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Login using phone or email and password' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Authenticated successfully', type: AuthResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() dto: LoginDto): Promise<AuthResponseDto> {
    const data = await this.authService.login(dto);
    return {
      success: true,
      message: 'Logged in successfully',
      data
    };
  }

  @Post('send-otp')
  @ApiOperation({ summary: 'Send 4-digit SMS OTP to an Ethiopian phone number' })
  @ApiBody({ type: SendOtpDto })
  @ApiResponse({ status: 200, description: 'SMS OTP dispatched (Test code: 8492)', type: SendOtpResponseDto })
  async sendOtp(@Body() body: SendOtpDto): Promise<SendOtpResponseDto> {
    return await this.authService.sendOtp(body.phone || '+251 911 482910');
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'Verify SMS OTP code and auto-authenticate traveler' })
  @ApiBody({ type: VerifyOtpDto })
  @ApiResponse({ status: 201, description: 'OTP verified, session token issued', type: AuthResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid or expired OTP code' })
  async verifyOtp(@Body() body: VerifyOtpDto): Promise<AuthResponseDto> {
    const data = await this.authService.verifyOtp(body.phone, body.code);
    return {
      success: true,
      message: 'Phone verified and authenticated',
      data
    };
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Fetch currently authenticated profile via Bearer session token' })
  @ApiResponse({ status: 200, description: 'User profile with role permissions', type: UserProfileResponseDto })
  async getMe(@Headers('authorization') authHeader?: string): Promise<UserProfileResponseDto> {
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
