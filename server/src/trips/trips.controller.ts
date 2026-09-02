import { Controller, Get, Post, Param, Query, Body, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { TripsService } from './trips.service';
import { PoliciesGuard } from '../casl/policies.guard';
import { CheckPolicies } from '../casl/check-policies.decorator';
import { Action } from '../casl/casl-ability.factory';
import { CreateTripDto, SingleTripResponseDto, TripsListResponseDto } from './dto/trips.dto';

@ApiTags('Trips')
@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Get()
  @ApiOperation({ summary: 'List all active adventure trips with optional filters' })
  @ApiQuery({ name: 'search', required: false, description: 'Search title, Amharic title, or destination' })
  @ApiQuery({ name: 'category', required: false, description: 'Filter by category (e.g. Weekend Hikes, Mountain Treks)' })
  @ApiQuery({ name: 'region', required: false, description: 'Filter by Ethiopian region (e.g. Oromia, Amhara, Afar)' })
  @ApiQuery({ name: 'maxPrice', required: false, description: 'Maximum price in ETB' })
  @ApiResponse({ status: 200, description: 'Returns filtered list of trips', type: TripsListResponseDto })
  async getAllTrips(
    @Query('search') search?: string,
    @Query('category') category?: string,
    @Query('region') region?: string,
    @Query('maxPrice') maxPrice?: string
  ): Promise<TripsListResponseDto> {
    const data = await this.tripsService.findAll({ search, category, region, maxPrice });
    return {
      success: true,
      count: data.length,
      data
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get details for a single trip including live Coaster occupied seats' })
  @ApiResponse({ status: 200, description: 'Trip details with availableSeats count', type: SingleTripResponseDto })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  async getTripById(@Param('id') id: string): Promise<SingleTripResponseDto> {
    const data = await this.tripsService.findOne(id);
    return {
      success: true,
      data
    };
  }

  @Post()
  @ApiBearerAuth()
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, 'Trip'))
  @ApiOperation({ summary: 'Publish a new adventure trip (RBAC: Host or Admin only)' })
  @ApiBody({ type: CreateTripDto })
  @ApiResponse({ status: 201, description: 'Trip published successfully', type: SingleTripResponseDto })
  @ApiResponse({ status: 403, description: 'Forbidden: Regular travelers cannot publish trips' })
  async createTrip(@Body() body: CreateTripDto): Promise<SingleTripResponseDto> {
    const data = await this.tripsService.create(body);
    return {
      success: true,
      data
    };
  }
}
