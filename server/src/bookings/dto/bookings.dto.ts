import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({ example: 'wenchi-crater-lake-day-hike', description: 'ID of the trip being booked' })
  tripId: string;

  @ApiProperty({ example: 'Amanuel Tadesse', description: 'Lead passenger full name' })
  passengerName: string;

  @ApiProperty({ example: '+251 911 482 109', description: 'Ethiopian phone number for dispatch SMS updates' })
  passengerPhone: string;

  @ApiPropertyOptional({ example: '@amanuel_hiker' })
  telegramHandle?: string;

  @ApiPropertyOptional({ example: '+251 922 113 355 (Brother: Dawit)' })
  emergencyContact?: string;

  @ApiProperty({ example: 2, description: 'Number of passenger tickets' })
  ticketCount: number;

  @ApiProperty({
    example: ['2A', '2B'],
    type: [String],
    description: 'Exact 28-Seat Toyota Coaster seat codes'
  })
  seats: string[];

  @ApiProperty({ example: 'meskel-square', description: 'Addis Ababa morning boarding station ID' })
  pickupStationId: string;

  @ApiProperty({ example: 'Meskel Square (06:00 AM)', description: 'Boarding station label & reporting schedule' })
  pickupStationName: string;

  @ApiProperty({
    example: 'telebirr',
    enum: ['telebirr', 'cbe', 'chapa'],
    description: 'Payment gateway for escrow deposit'
  })
  paymentMethod: 'telebirr' | 'cbe' | 'chapa';

  @ApiProperty({ example: 4400, description: 'Total booking amount in Ethiopian Birr (ETB)' })
  amountETB: number;
}

export class BookingDto {
  @ApiProperty({ example: 'GZ-2026-8812', description: 'Official GuzoTribe booking reference code' })
  id: string;

  @ApiProperty({ example: 'wenchi-crater-lake-day-hike' })
  tripId: string;

  @ApiProperty({ example: 'Amanuel Tadesse' })
  passengerName: string;

  @ApiProperty({ example: '+251 911 482 109' })
  passengerPhone: string;

  @ApiProperty({ example: '@amanuel_hiker' })
  telegramHandle: string;

  @ApiProperty({ example: 2 })
  ticketCount: number;

  @ApiProperty({ example: ['2A', '2B'], type: [String] })
  seats: string[];

  @ApiProperty({ example: 'Meskel Square (06:00 AM)' })
  pickupStationName: string;

  @ApiProperty({ example: 'telebirr' })
  paymentMethod: string;

  @ApiProperty({ example: 4400 })
  amountETB: number;

  @ApiProperty({ example: 'TLB-984210948', description: 'Telebirr/CBE payment transaction hash' })
  telebirrTxn: string;

  @ApiProperty({ example: 'escrow_secured', enum: ['escrow_secured', 'refunded_100_percent', 'pending'] })
  paymentStatus: string;

  @ApiProperty({ example: 'confirmed', enum: ['confirmed', 'cancelled', 'completed'] })
  status: string;

  @ApiProperty({ example: '2026-09-02T18:00:00.000Z' })
  createdAt: string;
}

export class SingleBookingResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Coaster seats reserved and escrow payment secured' })
  message: string;

  @ApiProperty({ type: BookingDto })
  data: BookingDto;
}

export class BookingsListResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 2 })
  count: number;

  @ApiProperty({ type: [BookingDto] })
  data: BookingDto[];
}

export class CancelBookingResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 'Booking GZ-2026-8812 cancelled. 100% Escrow refund processed to telebirr.' })
  message: string;

  @ApiProperty({ type: BookingDto })
  booking: BookingDto;
}
