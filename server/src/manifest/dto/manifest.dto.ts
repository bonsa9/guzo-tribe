import { ApiProperty } from '@nestjs/swagger';

export class VehicleInspectionDto {
  @ApiProperty({ example: 'Toyota Coaster (28 Passenger Seats)' })
  model: string;

  @ApiProperty({ example: '3 - A.A 84920' })
  plateNumber: string;

  @ApiProperty({ example: 'Mulugeta Bekele' })
  captainName: string;

  @ApiProperty({ example: 'Commercial Grade 4 Heavy Passenger' })
  captainLicense: string;
}

export class TourGuideDto {
  @ApiProperty({ example: 'Dawit Mengistu' })
  name: string;

  @ApiProperty({ example: 'MoT-LIC-2024-889' })
  motLicense: string;

  @ApiProperty({ example: '+251 911 234 567' })
  phone: string;
}

export class SecurityInspectionDto {
  @ApiProperty({ example: 'VERIFIED' })
  firstAidKit: string;

  @ApiProperty({ example: 'PASS (2kg ABC)' })
  fireExtinguisher: string;

  @ApiProperty({ example: 'CHECKED' })
  spareTireAndJack: string;

  @ApiProperty({ example: 'CLEARED' })
  scoutClearance: string;
}

export class RosterSummaryDto {
  @ApiProperty({ example: 28 })
  totalSeats: number;

  @ApiProperty({ example: 28 })
  confirmedPassengers: number;

  @ApiProperty({ example: '100%' })
  escrowClearedPercentage: string;
}

export class ManifestDataDto {
  @ApiProperty({ example: 'ET-MOT-MNF-2026-0941' })
  manifestRef: string;

  @ApiProperty({ example: 'FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA • MINISTRY OF TOURISM' })
  authority: string;

  @ApiProperty({ example: 'wenchi-crater-lake-day-hike' })
  tripId: string;

  @ApiProperty({ example: 'Wenchi Crater Lake Hike & Boat Ride' })
  tripTitle: string;

  @ApiProperty({ example: 'Wenchi, Oromia' })
  destination: string;

  @ApiProperty({ example: 'Saturday, Sep 6, 2026' })
  departureDate: string;

  @ApiProperty({ example: '06:00 AM' })
  departureTime: string;

  @ApiProperty({ type: VehicleInspectionDto })
  vehicle: VehicleInspectionDto;

  @ApiProperty({ type: TourGuideDto })
  tourGuide: TourGuideDto;

  @ApiProperty({ type: SecurityInspectionDto })
  securityInspection: SecurityInspectionDto;

  @ApiProperty({ type: RosterSummaryDto })
  rosterSummary: RosterSummaryDto;
}

export class ManifestResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: ManifestDataDto })
  data: ManifestDataDto;
}
