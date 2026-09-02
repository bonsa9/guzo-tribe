import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class ManifestService {
  constructor(private readonly db: DatabaseService) {}

  async getManifest(tripId: string) {
    const trip = this.db.inMemoryTrips.find(t => t.id === tripId) || this.db.inMemoryTrips[0];
    if (!trip) {
      throw new NotFoundException(`Trip with ID '${tripId}' not found`);
    }

    return {
      manifestRef: 'ET-MOT-MNF-2026-0941',
      authority: 'FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA • MINISTRY OF TOURISM',
      tripId: trip.id,
      tripTitle: trip.title,
      destination: trip.destination,
      departureDate: trip.nextDeparture,
      departureTime: trip.departureTime,
      vehicle: {
        model: 'Toyota Coaster (28 Passenger Seats)',
        plateNumber: '3 - A.A 84920',
        captainName: 'Mulugeta Bekele',
        captainLicense: 'Commercial Grade 4 Heavy Passenger'
      },
      tourGuide: {
        name: 'Dawit Mengistu',
        motLicense: 'MoT-LIC-2024-889',
        phone: '+251 911 234 567'
      },
      securityInspection: {
        firstAidKit: 'VERIFIED',
        fireExtinguisher: 'PASS (2kg ABC)',
        spareTireAndJack: 'CHECKED',
        scoutClearance: 'CLEARED'
      },
      rosterSummary: {
        totalSeats: 28,
        confirmedPassengers: 28,
        escrowClearedPercentage: '100%'
      }
    };
  }
}
