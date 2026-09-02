import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGroupSplitDto {
  @ApiProperty({ example: 'wenchi-crater-lake-day-hike' })
  tripId: string;

  @ApiProperty({ example: 'Yared Melaku' })
  hostName: string;

  @ApiProperty({ example: '+251 911 412 890' })
  hostPhone: string;

  @ApiProperty({
    example: ['3A', '3B', '3C', '3D'],
    type: [String],
    description: 'Reserved 28-seat Coaster seats locked for the split group'
  })
  seats: string[];

  @ApiProperty({ example: 'meskel-square' })
  pickupStationId: string;

  @ApiProperty({ example: 'Meskel Square (06:00 AM)' })
  pickupStationName: string;

  @ApiProperty({ example: 2200, description: 'Equal share per crew member in ETB' })
  amountPerPerson: number;
}

export class PayGroupShareDto {
  @ApiProperty({ example: '3C', description: 'Coaster seat code being claimed' })
  seat: string;

  @ApiProperty({ example: 'Daniel Kebede' })
  name: string;

  @ApiProperty({ example: '+251 911 222 333' })
  phone: string;

  @ApiProperty({ example: 'telebirr', enum: ['telebirr', 'cbe'] })
  method: 'telebirr' | 'cbe';
}

export class GroupSplitMemberDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Yared M. (Host)' })
  name: string;

  @ApiProperty({ example: '+251 911 412 890' })
  phone: string;

  @ApiProperty({ example: '3A (Window)' })
  seat: string;

  @ApiProperty({ example: 'paid', enum: ['paid', 'pending'] })
  status: string;

  @ApiProperty({ example: 2200 })
  amountETB: number;

  @ApiPropertyOptional({ example: 'Telebirr' })
  method?: string;

  @ApiPropertyOptional({ example: '12 mins ago' })
  paidAt?: string;
}

export class GroupSplitSessionDto {
  @ApiProperty({ example: 'wenchi-crew-4821' })
  splitId: string;

  @ApiProperty({ example: 'wenchi-crater-lake-day-hike' })
  tripId: string;

  @ApiProperty({ example: 'Yared M. (Group Host)' })
  hostName: string;

  @ApiProperty({ example: '+251 911 412 890' })
  hostPhone: string;

  @ApiProperty({ example: ['3A', '3B', '3C', '3D'], type: [String] })
  seats: string[];

  @ApiProperty({ example: 'meskel-square' })
  pickupStationId: string;

  @ApiProperty({ example: 'Meskel Square (06:00 AM)' })
  pickupStationName: string;

  @ApiProperty({ example: 2200 })
  amountPerPerson: number;

  @ApiProperty({ example: 8800 })
  totalAmount: number;

  @ApiProperty({ example: '2026-09-02T19:00:00.000Z', description: '60-minute lock expiration timestamp' })
  expiresAt: string;

  @ApiProperty({ example: 2 })
  paidCount: number;

  @ApiProperty({ example: 4 })
  totalCount: number;

  @ApiProperty({ example: 50, description: 'Percentage of crew shares paid' })
  progressPercent: number;

  @ApiProperty({ example: false })
  isFullyPaid: boolean;

  @ApiProperty({ type: [GroupSplitMemberDto] })
  members: GroupSplitMemberDto[];
}

export class GroupSplitResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiPropertyOptional({ example: 'Coaster seats locked for 60 minutes. Share group link.' })
  message?: string;

  @ApiProperty({ type: GroupSplitSessionDto })
  data: GroupSplitSessionDto;
}
