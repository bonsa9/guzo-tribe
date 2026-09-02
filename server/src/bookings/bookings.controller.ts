import { Controller, Get, Post, Delete, Param, Query, Body } from '@nestjs/common';
import { BookingsService, CreateBookingDto } from './bookings.service';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async createBooking(@Body() dto: CreateBookingDto) {
    const data = await this.bookingsService.create(dto);
    return {
      success: true,
      message: 'Coaster seats reserved and escrow payment secured',
      data
    };
  }

  @Get('my')
  async getMyBookings(@Query('phone') phone?: string) {
    const data = await this.bookingsService.findMyBookings(phone);
    return {
      success: true,
      count: data.length,
      data
    };
  }

  @Get(':id')
  async getBookingById(@Param('id') id: string) {
    const data = await this.bookingsService.findOne(id);
    return {
      success: true,
      data
    };
  }

  @Delete(':id')
  async cancelBooking(@Param('id') id: string) {
    return await this.bookingsService.cancel(id);
  }
}
