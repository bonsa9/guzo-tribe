import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class GroupSplitService {
  constructor(private readonly db: DatabaseService) {}

  async createSplit(dto: {
    tripId: string;
    hostName: string;
    hostPhone: string;
    seats: string[];
    pickupStationId: string;
    pickupStationName: string;
    amountPerPerson: number;
  }) {
    if (!dto.tripId || !dto.hostName || !dto.seats || dto.seats.length < 2) {
      throw new BadRequestException('Group split requires at least 2 Coaster seats and host information.');
    }

    const splitId = `${dto.tripId}-crew-${Math.floor(1000 + Math.random() * 9000)}`;
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 60 minutes from now

    const members = dto.seats.map((seat, idx) => ({
      id: idx + 1,
      name: idx === 0 ? `${dto.hostName} (Host)` : `Pending Friend #${idx + 1}`,
      phone: idx === 0 ? dto.hostPhone : '',
      seat,
      status: idx === 0 ? 'paid' : 'pending',
      amountETB: dto.amountPerPerson,
      method: idx === 0 ? 'Telebirr' : null,
      paidAt: idx === 0 ? 'Just now' : null
    }));

    const session = {
      splitId,
      tripId: dto.tripId,
      hostName: dto.hostName,
      hostPhone: dto.hostPhone,
      seats: dto.seats,
      pickupStationId: dto.pickupStationId,
      pickupStationName: dto.pickupStationName,
      amountPerPerson: dto.amountPerPerson,
      totalAmount: dto.amountPerPerson * dto.seats.length,
      expiresAt,
      paidCount: 1,
      totalCount: dto.seats.length,
      progressPercent: Math.round((1 / dto.seats.length) * 100),
      isFullyPaid: false,
      members,
      status: 'active',
      createdAt: new Date().toISOString()
    };

    this.db.inMemoryGroupSplits.set(splitId, session);
    return session;
  }

  async getSplit(splitId: string) {
    let session = this.db.inMemoryGroupSplits.get(splitId);
    
    // Auto-generate if accessed for the first time
    if (!session) {
      const trip = this.db.inMemoryTrips.find(t => splitId.includes(t.id)) || this.db.inMemoryTrips[0];
      session = {
        splitId,
        tripId: trip.id,
        hostName: 'Yared M. (Group Host)',
        hostPhone: '+251 911 412 890',
        seats: ['3A', '3B', '3C', '3D'],
        pickupStationId: 'meskel-square',
        pickupStationName: 'Meskel Square (06:00 AM)',
        amountPerPerson: trip.priceETB,
        totalAmount: trip.priceETB * 4,
        expiresAt: new Date(Date.now() + 54 * 60 * 1000).toISOString(),
        members: [
          { id: 1, name: 'Yared M. (Host)', phone: '+251 911 412 890', seat: '3A (Window)', status: 'paid', amountETB: trip.priceETB, method: 'Telebirr', paidAt: '12 mins ago' },
          { id: 2, name: 'Selamawit B.', phone: '+251 922 890 123', seat: '3B (Aisle)', status: 'paid', amountETB: trip.priceETB, method: 'Telebirr', paidAt: '4 mins ago' },
          { id: 3, name: 'Pending Friend #3', phone: '', seat: '3C (Aisle)', status: 'pending', amountETB: trip.priceETB, method: null, paidAt: null },
          { id: 4, name: 'Pending Friend #4', phone: '', seat: '3D (Window)', status: 'pending', amountETB: trip.priceETB, method: null, paidAt: null }
        ],
        status: 'active',
        createdAt: new Date().toISOString()
      };
      this.db.inMemoryGroupSplits.set(splitId, session);
    }

    const paidCount = session.members.filter((m: any) => m.status === 'paid').length;
    const totalCount = session.members.length;
    const isFullyPaid = paidCount === totalCount;

    return {
      ...session,
      paidCount,
      totalCount,
      progressPercent: Math.round((paidCount / totalCount) * 100),
      isFullyPaid
    };
  }

  async payShare(splitId: string, payload: { seat: string; name: string; phone: string; method: string }) {
    const session = await this.getSplit(splitId);
    if (!session) {
      throw new NotFoundException(`Group split '${splitId}' not found`);
    }

    const member = session.members.find((m: any) => m.seat.startsWith(payload.seat) || m.seat === payload.seat);
    if (!member) {
      throw new BadRequestException(`Seat ${payload.seat} is not part of this group split hold.`);
    }

    if (member.status === 'paid') {
      throw new BadRequestException(`Seat ${payload.seat} has already been paid.`);
    }

    member.name = payload.name;
    member.phone = payload.phone;
    member.status = 'paid';
    member.method = payload.method === 'telebirr' ? 'Telebirr' : 'CBE Birr';
    member.paidAt = 'Just now';

    this.db.inMemoryGroupSplits.set(splitId, session);

    return {
      success: true,
      message: `Share for ${member.seat} paid via ${member.method}.`,
      session
    };
  }
}
