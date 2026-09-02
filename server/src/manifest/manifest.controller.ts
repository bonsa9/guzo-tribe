import { Controller, Get, Param } from '@nestjs/common';
import { ManifestService } from './manifest.service';

@Controller('manifest')
export class ManifestController {
  constructor(private readonly manifestService: ManifestService) {}

  @Get(':tripId')
  async getManifest(@Param('tripId') tripId: string) {
    const data = await this.manifestService.getManifest(tripId);
    return {
      success: true,
      data
    };
  }
}
