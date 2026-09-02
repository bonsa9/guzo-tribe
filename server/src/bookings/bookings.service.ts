import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

import { CreateBookingDto } from './dto/bookings.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly db: DatabaseService) {}

  async create(dto: CreateBookingDto) {
    if (!dto.tripId || !dto.passengerName || !dto.passengerPhone) {
      throw new BadRequestException('tripId, passengerName, and passengerPhone are required');
    }

    if (!dto.seats || dto.seats.length === 0) {
      throw new BadRequestException('At least one Toyota Coaster seat must be selected');
    }

    if (dto.seats.length !== dto.ticketCount) {
      throw new BadRequestException(`Number of selected seats (${dto.seats.length}) must match ticket count (${dto.ticketCount})`);
    }

    // Check if any seat is already booked for this trip
    const existingBookings = this.db.inMemoryBookings.filter(
      b => b.tripId === dto.tripId && b.status === 'confirmed'
    );
    const alreadyBooked = new Set<string>();
    existingBookings.forEach(b => b.seats.forEach((s: string) => alreadyBooked.add(s.split(' ')[0])));

    for (const seat of dto.seats) {
      const cleanSeat = seat.split(' ')[0];
      if (alreadyBooked.has(cleanSeat)) {
        throw new BadRequestException(`Seat ${cleanSeat} is already booked by another traveler.`);
      }
    }

    const bookingRef = `GZ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newBooking = {
      id: bookingRef,
      tripId: dto.tripId,
      passengerName: dto.passengerName,
      passengerPhone: dto.passengerPhone,
      telegramHandle: dto.telegramHandle || '@',
      emergencyContact: dto.emergencyContact || '',
      ticketCount: dto.ticketCount,
      seats: dto.seats,
      pickupStationId: dto.pickupStationId,
      pickupStationName: dto.pickupStationName,
      paymentMethod: dto.paymentMethod,
      amountETB: dto.amountETB,
      telebirrTxn: `TLB-${Math.floor(100000000 + Math.random() * 900000000)}`,
      paymentStatus: 'escrow_secured',
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };

    if (this.db.isDbConnected) {
      await this.db.query(
        `INSERT INTO bookings (id, trip_id, user_id, seats_count, total_amount_etb, payment_method, status, boarding_station) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          newBooking.id,
          newBooking.tripId,
          newBooking.passengerPhone,
          newBooking.ticketCount,
          newBooking.amountETB,
          newBooking.paymentMethod,
          newBooking.status,
          newBooking.pickupStationName
        ]
      );
    }

    this.db.inMemoryBookings.unshift(newBooking);
    return newBooking;
  }

  async findMyBookings(phone?: string) {
    if (this.db.isDbConnected && phone) {
      const res = await this.db.query(`SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC`, [phone]);
      if (res && res.rows.length > 0) return res.rows;
    }

    if (phone) {
      return this.db.inMemoryBookings.filter(b => b.passengerPhone.includes(phone) || b.status === 'confirmed');
    }

    return this.db.inMemoryBookings;
  }

  async findOne(id: string) {
    const booking = this.db.inMemoryBookings.find(b => b.id === id);
    if (!booking) {
      throw new NotFoundException(`Booking with reference '${id}' not found`);
    }
    return booking;
  }

  async cancel(id: string) {
    const bookingIndex = this.db.inMemoryBookings.findIndex(b => b.id === id);
    if (bookingIndex === -1) {
      throw new NotFoundException(`Booking with reference '${id}' not found`);
    }

    const booking = this.db.inMemoryBookings[bookingIndex];
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded_100_percent';

    if (this.db.isDbConnected) {
      await this.db.query(`UPDATE bookings SET status = 'cancelled' WHERE id = $1`, [id]);
    }

    return {
      success: true,
      message: `Booking ${id} cancelled. 100% Escrow refund processed to ${booking.paymentMethod}.`,
      booking
    };
  }
}
