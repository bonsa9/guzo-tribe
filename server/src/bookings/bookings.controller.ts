import { Controller, Get, Post, Delete, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BookingsService, CreateBookingDto } from './bookings.service';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';

@ApiTags('Bookings')
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  @ApiOperation({ summary: 'Reserve 28-Seat Toyota Coaster seats and lock escrow booking' })
  @ApiResponse({ status: 201, description: 'Seats reserved successfully, booking reference generated' })
  @ApiResponse({ status: 400, description: 'Invalid seats or seat already reserved' })
  async createBooking(@Body() dto: CreateBookingDto) {
    const data = await this.bookingsService.create(dto);
    return {
      success: true,
      message: 'Coaster seats reserved and escrow payment secured',
      data
    };
  }

  @Get('my')
  @ApiOperation({ summary: 'Retrieve active and completed bookings for the current traveler' })
  @ApiQuery({ name: 'phone', required: false, description: 'Filter bookings by passenger phone number' })
  @ApiResponse({ status: 200, description: 'List of confirmed passenger bookings' })
  async getMyBookings(@Query('phone') phone?: string) {
    const data = await this.bookingsService.findMyBookings(phone);
    return {
      success: true,
      count: data.length,
      data
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single booking by reference code (e.g. GZ-2026-8812)' })
  @ApiResponse({ status: 200, description: 'Booking pass details' })
  @ApiResponse({ status: 404, description: 'Booking not found' })
  async getBookingById(@Param('id') id: string) {
    const data = await this.bookingsService.findOne(id);
    return {
      success: true,
      data
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Delete, 'Booking'))
  @ApiOperation({ summary: 'Cancel booking and issue 100% Telebirr escrow refund (RBAC: Traveler or Admin)' })
  @ApiResponse({ status: 200, description: 'Booking cancelled and escrow refunded' })
  async cancelBooking(@Param('id') id: string) {
    return await this.bookingsService.cancel(id);
  }
}
