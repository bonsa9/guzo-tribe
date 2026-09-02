import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { Pool, QueryResult } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(DatabaseService.name);
  private pool: Pool | null = null;
  private isConnected = false;

  // In-memory fallback dataset for seamless development when PostgreSQL is not running locally
  public inMemoryTrips: any[] = [];
  public inMemoryBookings: any[] = [];
  public inMemoryGroupSplits: Map<string, any> = new Map();

  async onModuleInit() {
    this.initializeInMemoryData();

    try {
      this.pool = new Pool({
        host: process.env.PG_HOST || 'localhost',
        port: parseInt(process.env.PG_PORT || '5432', 10),
        database: process.env.PG_DATABASE || 'guzotribe_db',
        user: process.env.PG_USER || 'postgres',
        password: process.env.PG_PASSWORD || 'postgres',
        ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
        connectionTimeoutMillis: 1500
      });

      const client = await this.pool.connect();
      this.isConnected = true;
      client.release();
      this.logger.log('✅ Connected successfully to PostgreSQL database: guzotribe_db');
    } catch (err: any) {
      this.isConnected = false;
      this.logger.warn(`⚠️ PostgreSQL local daemon not detected (${err.message}). Using high-performance in-memory persistence layer.`);
    }
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
    }
  }

  async query<T = any>(sql: string, params: any[] = []): Promise<QueryResult<T> | null> {
    if (this.isConnected && this.pool) {
      try {
        return await this.pool.query(sql, params);
      } catch (err: any) {
        this.logger.error(`PostgreSQL query error: ${err.message}`);
        throw err;
      }
    }
    return null;
  }

  get isDbConnected(): boolean {
    return this.isConnected;
  }

  private initializeInMemoryData() {
    this.inMemoryTrips = [
      {
        id: 'wenchi-crater-lake-day-hike',
        title: 'Wenchi Crater Lake Hike & Boat Ride',
        amharicTitle: 'የወንጪ እሳተ-ገሞራ ሀይቅ የእግር ጉዞ እና የጀልባ ሽርሽር',
        organizer: 'Muller Outdoors Ethiopia',
        organizerId: 'org-muller-outdoors',
        organizerSlug: 'muller-outdoors',
        organizerRating: 4.95,
        organizerVerified: true,
        destination: 'Wenchi, Oromia',
        region: 'Oromia',
        priceETB: 2200,
        priceUSD: 38,
        difficulty: 'Moderate',
        duration: '1 Day',
        nextDeparture: 'Saturday, Sep 6, 2026',
        departureTime: '06:00 AM',
        totalSeats: 28,
        availableSeats: 6,
        occupiedSeats: ['1A', '1B', '2A', '2C', '3A', '3B', '4A', '4B', '5A', '5B', '6A', '7A', '7B', '7C'],
        category: 'Weekend Hikes',
        coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
        inclusions: [
          'Roundtrip 28-Seat Toyota Coaster transport from Addis Ababa',
          'Certified Mountain Guide & Armed Park Scout',
          'Traditional wooden boat lake crossing to Kirkos monastery island',
          'Fresh organic lunch (Enjera & Oromo traditional honey)',
          'Natural hot spring mineral bath entry'
        ]
      },
      {
        id: 'bale-mountains-sanetti-plateau',
        title: 'Bale Mountains Afro-Alpine & Sanetti Trek',
        amharicTitle: 'የባሌ ተራሮች ሳኔቲ አምባ የዱር አራዊት ፍለጋ',
        organizer: 'Wild Abyssinia Expeditions',
        organizerId: 'org-wild-abyssinia',
        organizerSlug: 'wild-abyssinia',
        organizerRating: 4.98,
        organizerVerified: true,
        destination: 'Bale Mountains, Oromia',
        region: 'Oromia',
        priceETB: 12500,
        priceUSD: 195,
        difficulty: 'Strenuous',
        duration: '3 Days / 2 Nights',
        nextDeparture: 'Friday, Sep 19, 2026',
        departureTime: '06:20 AM',
        totalSeats: 28,
        availableSeats: 8,
        occupiedSeats: ['1A', '2A', '2B', '3C', '4A', '5A', '6B', '7A'],
        category: 'Mountain Treks',
        coverImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
        inclusions: [
          'All-terrain 4WD & Coaster convoy',
          'National Park scout & certified wildlife spotter',
          'Camping gear & alpine sleeping bags (-5°C rated)',
          'All chef-prepared warm meals and hot tea/coffee',
          'Guaranteed Ethiopian Red Wolf tracking permit'
        ]
      },
      {
        id: 'suba-menagesha-forest-hike',
        title: 'Suba Menagesha Ancient Forest & Wechecha Peak',
        amharicTitle: 'የመናገሻ ሱባ ጥንታዊ ደን እና የወጨጫ ተራራ ጉዞ',
        organizer: 'Shewa Hikers Club',
        organizerId: 'org-shewa-hikers',
        organizerSlug: 'shewa-hikers',
        organizerRating: 4.88,
        organizerVerified: true,
        destination: 'Suba, West Shewa',
        region: 'Oromia',
        priceETB: 1650,
        priceUSD: 28,
        difficulty: 'Easy to Moderate',
        duration: '1 Day',
        nextDeparture: 'Sunday, Sep 7, 2026',
        departureTime: '06:35 AM',
        totalSeats: 28,
        availableSeats: 12,
        occupiedSeats: ['1A', '2A', '3A', '4A', '5A'],
        category: 'Weekend Hikes',
        coverImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80',
        inclusions: [
          'Coaster pickup from Addis Ababa (Megenagna / CMC)',
          'Forest entrance fees and guided botanical hike',
          'Traditional coffee ceremony and snacks'
        ]
      }
    ];

    this.inMemoryBookings = [
      {
        id: 'GZ-2026-8812',
        tripId: 'wenchi-crater-lake-day-hike',
        passengerName: 'Amanuel Tadesse',
        passengerPhone: '+251 911 482 109',
        seats: ['2A', '2B'],
        ticketCount: 2,
        amountETB: 4400,
        pickupStationId: 'meskel-square',
        pickupStationName: 'Meskel Square (06:00 AM)',
        paymentMethod: 'telebirr',
        paymentStatus: 'escrow_secured',
        telebirrTxn: 'TLB-984210948',
        status: 'confirmed',
        createdAt: new Date().toISOString()
      }
    ];
  }
}
