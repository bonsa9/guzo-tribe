import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { TripsModule } from './trips/trips.module';
import { BookingsModule } from './bookings/bookings.module';
import { GroupSplitModule } from './group-split/group-split.module';
import { EscrowModule } from './escrow/escrow.module';
import { ManifestModule } from './manifest/manifest.module';
import { AuthModule } from './auth/auth.module';
import { CaslModule } from './casl/casl.module';

@Module({
  imports: [
    DatabaseModule,
    CaslModule,
    AuthModule,
    TripsModule,
    BookingsModule,
    GroupSplitModule,
    EscrowModule,
    ManifestModule
  ]
})
export class AppModule {}
