import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SendOtpDto {
  @ApiProperty({
    description: 'Ethiopian mobile phone number with or without country code',
    example: '+251 911 482910'
  })
  phone: string;
}

export class SendOtpResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'SMS OTP dispatched to +251911482910. (Verification code: 8492)' })
  message: string;

  @ApiProperty({ example: '8492' })
  testCode: string;
}

export class VerifyOtpDto {
  @ApiProperty({
    description: 'Target mobile phone number',
    example: '+251 911 482910'
  })
  phone: string;

  @ApiProperty({
    description: '4-digit SMS verification code',
    example: '8492'
  })
  code: string;
}

export class UserDto {
  @ApiProperty({ example: 'usr-trav-001' })
  id: string;

  @ApiProperty({ example: 'Bethlehem Tadesse' })
  name: string;

  @ApiProperty({ example: '+251911482910' })
  phone: string;

  @ApiProperty({ example: 'bethlehem@example.com' })
  email: string;

  @ApiProperty({ example: 'traveler', enum: ['traveler', 'host', 'admin'] })
  role: string;

  @ApiProperty({ example: 'Addis Ababa (Bole)' })
  city: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80' })
  avatar: string;

  @ApiProperty({ example: '2026-09-02T18:00:00.000Z' })
  createdAt: string;
}

export class AuthResponseDataDto {
  @ApiProperty({
    description: 'Bearer session authentication token',
    example: 'gz_tok_usr-trav-001_dHJhdmVsZXI=_1788372089738'
  })
  token: string;

  @ApiProperty({ type: UserDto })
  user: UserDto;
}

export class AuthResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Phone verified and authenticated' })
  message: string;

  @ApiProperty({ type: AuthResponseDataDto })
  data: AuthResponseDataDto;
}

export class RegisterDto {
  @ApiProperty({ example: 'Abebe Bikila' })
  name: string;

  @ApiProperty({ example: '+251 911 777888' })
  phone: string;

  @ApiPropertyOptional({ example: 'abebe@marathon.et' })
  email?: string;

  @ApiPropertyOptional({ example: 'password123' })
  password?: string;

  @ApiPropertyOptional({
    enum: ['traveler', 'host', 'admin'],
    example: 'traveler',
    default: 'traveler'
  })
  role?: 'traveler' | 'host' | 'admin';

  @ApiPropertyOptional({ example: 'Addis Ababa' })
  city?: string;

  @ApiPropertyOptional({ example: 'Great Rift Expeditions' })
  businessName?: string;

  @ApiPropertyOptional({ example: 'MOT-ET-2025-08492' })
  licenseNumber?: string;
}

export class LoginDto {
  @ApiProperty({
    description: 'Registered phone number or email address',
    example: 'info@addishikers.et'
  })
  identifier: string;

  @ApiPropertyOptional({
    description: 'Account password',
    example: 'password123'
  })
  password?: string;
}

export class UserProfileResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: UserDto })
  data: UserDto;
}
