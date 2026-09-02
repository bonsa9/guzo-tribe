import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TripsService {
  constructor(private readonly db: DatabaseService) {}

  async findAll(query?: { search?: string; category?: string; region?: string; maxPrice?: string }) {
    if (this.db.isDbConnected) {
      let sql = `SELECT * FROM trips WHERE status = 'published'`;
      const params: any[] = [];

      if (query?.category && query.category !== 'All') {
        params.push(query.category);
        sql += ` AND category = $${params.length}`;
      }

      if (query?.search) {
        params.push(`%${query.search}%`);
        sql += ` AND (title ILIKE $${params.length} OR amharic_title ILIKE $${params.length} OR region ILIKE $${params.length})`;
      }

      const res = await this.db.query(sql, params);
      if (res && res.rows.length > 0) return res.rows;
    }

    // In-memory filter fallback
    let results = [...this.db.inMemoryTrips];

    if (query?.category && query.category !== 'All') {
      results = results.filter(t => t.category.toLowerCase() === query.category?.toLowerCase());
    }

    if (query?.search) {
      const q = query.search.toLowerCase();
      results = results.filter(t => 
        t.title.toLowerCase().includes(q) || 
        t.amharicTitle?.toLowerCase().includes(q) ||
        t.destination?.toLowerCase().includes(q)
      );
    }

    if (query?.region) {
      results = results.filter(t => t.region.toLowerCase() === query.region?.toLowerCase());
    }

    if (query?.maxPrice) {
      const max = parseFloat(query.maxPrice);
      if (!isNaN(max)) {
        results = results.filter(t => t.priceETB <= max);
      }
    }

    return results;
  }

  async findOne(id: string) {
    if (this.db.isDbConnected) {
      const res = await this.db.query(`SELECT * FROM trips WHERE id = $1`, [id]);
      if (res && res.rows.length > 0) return res.rows[0];
    }

    const trip = this.db.inMemoryTrips.find(t => t.id === id);
    if (!trip) {
      throw new NotFoundException(`Trip with ID '${id}' not found`);
    }

    // Calculate latest occupied seats by querying confirmed bookings
    const tripBookings = this.db.inMemoryBookings.filter(b => b.tripId === id && b.status === 'confirmed');
    const occupied = new Set(trip.occupiedSeats || []);
    tripBookings.forEach(b => {
      b.seats.forEach((s: string) => occupied.add(s.split(' ')[0]));
    });

    return {
      ...trip,
      occupiedSeats: Array.from(occupied),
      availableSeats: Math.max(0, trip.totalSeats - occupied.size)
    };
  }

  async create(tripData: any) {
    const newTrip = {
      id: tripData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      ...tripData,
      totalSeats: tripData.totalSeats || 28,
      occupiedSeats: [],
      availableSeats: tripData.totalSeats || 28,
      createdAt: new Date().toISOString()
    };

    if (this.db.isDbConnected) {
      await this.db.query(
        `INSERT INTO trips (id, title, amharic_title, price_etb, difficulty, duration_days) VALUES ($1, $2, $3, $4, $5, $6)`,
        [newTrip.id, newTrip.title, newTrip.amharicTitle || newTrip.title, newTrip.priceETB, newTrip.difficulty, 1]
      );
    }

    this.db.inMemoryTrips.push(newTrip);
    return newTrip;
  }
}
