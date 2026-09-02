import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTripDto {
  @ApiProperty({ example: 'Simien Mountains High Ridge Trek' })
  title: string;

  @ApiPropertyOptional({ example: 'የስሜን ተራሮች ከፍተኛ ጫፍ ጉዞ' })
  amharicTitle?: string;

  @ApiProperty({ example: 'Simien Mountains, Amhara' })
  destination: string;

  @ApiProperty({ example: 'Amhara', enum: ['Oromia', 'Amhara', 'Afar', 'Tigray', 'Sidama', 'SNNPR'] })
  region: string;

  @ApiProperty({ example: 14500, description: 'Price per passenger in Ethiopian Birr (ETB)' })
  priceETB: number;

  @ApiPropertyOptional({ example: 220, description: 'Price in USD for international travelers' })
  priceUSD?: number;

  @ApiProperty({ example: 'Strenuous', enum: ['Easy', 'Moderate', 'Strenuous', 'Extreme'] })
  difficulty: string;

  @ApiProperty({ example: '3 Days / 2 Nights' })
  duration: string;

  @ApiProperty({ example: 'Friday, Oct 16, 2026' })
  nextDeparture: string;

  @ApiProperty({ example: '06:00 AM' })
  departureTime: string;

  @ApiProperty({ example: 28, default: 28, description: 'Total passenger capacity of Toyota Coaster' })
  totalSeats: number;

  @ApiProperty({ example: 'Mountain Treks', enum: ['Weekend Hikes', 'Mountain Treks', 'Cultural Expeditions', 'Volcano Treks'] })
  category: string;

  @ApiPropertyOptional({ example: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80' })
  coverImage?: string;

  @ApiPropertyOptional({
    example: [
      'Roundtrip 28-Seat Toyota Coaster convoy',
      'Park Scout & Mountain Guide',
      'High-altitude camping gear & warm sleeping bags',
      'Guaranteed Ethiopian Red Wolf tracking'
    ],
    type: [String]
  })
  inclusions?: string[];
}

export class TripDto extends CreateTripDto {
  @ApiProperty({ example: 'simien-mountains-high-ridge-trek' })
  id: string;

  @ApiProperty({ example: 'Wild Abyssinia Expeditions' })
  organizer: string;

  @ApiProperty({ example: true })
  organizerVerified: boolean;

  @ApiProperty({ example: 4.95 })
  organizerRating: number;

  @ApiProperty({ example: ['1A', '1B', '2A', '2B', '3A'], type: [String], description: 'Occupied Toyota Coaster seat codes' })
  occupiedSeats: string[];

  @ApiProperty({ example: 23, description: 'Remaining available seats on the 28-seat Coaster' })
  availableSeats: number;

  @ApiProperty({ example: '2026-09-02T18:00:00.000Z' })
  createdAt: string;
}

export class SingleTripResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: TripDto })
  data: TripDto;
}

export class TripsListResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: 3 })
  count: number;

  @ApiProperty({ type: [TripDto] })
  data: TripDto[];
}
