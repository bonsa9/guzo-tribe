import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ManifestService } from './manifest.service';

@ApiTags('Manifest')
@Controller('manifest')
export class ManifestController {
  constructor(private readonly manifestService: ManifestService) {}

  @Get(':tripId')
  @ApiOperation({ summary: 'Generate official Ministry of Tourism (MoT) highway checkpoint manifest' })
  @ApiResponse({ status: 200, description: 'MoT manifest with 28-seat passenger roster, vehicle safety, and driver license' })
  async getManifest(@Param('tripId') tripId: string) {
    const data = await this.manifestService.getManifest(tripId);
    return {
      success: true,
      data
    };
  }
}
