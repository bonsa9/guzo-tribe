import { Controller, Get, Post, Param, Query, Body } from '@nestjs/common';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  async getAllTrips(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('region') region?: string,
    @Query('maxPrice') maxPrice?: string
  ) {
    const data = await this.tripsService.findAll({ search, category, region, maxPrice });
    return {
      success: true,
      count: data.length,
      data
    };
  }

  @Get(':id')
  async getTripById(@Param('id') id: string) {
    const data = await this.tripsService.findOne(id);
    return {
      success: true,
      data
    };
  }

  @Post()
  async createTrip(@Body() body: any) {
    const data = await this.tripsService.create(body);
    return {
      success: true,
      message: 'Trip created successfully',
      data
    };
  }
}
