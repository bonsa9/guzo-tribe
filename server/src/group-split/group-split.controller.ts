import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GroupSplitService } from './group-split.service';

@ApiTags('GroupSplit')
@Controller('group-split')
export class GroupSplitController {
  constructor(private readonly splitService: GroupSplitService) {}

  @Post('create')
  @ApiOperation({ summary: 'Lock 2–6 Coaster bus seats for 60 minutes and initialize group split session' })
  @ApiResponse({ status: 201, description: 'Seats locked and group split link generated' })
  async createSplit(@Body() body: any) {
    const data = await this.splitService.createSplit(body);
    return {
      success: true,
      message: 'Coaster seats locked for 60 minutes. Share group link.',
      data
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get active group split session with 60-min timer and crew payment statuses' })
  @ApiResponse({ status: 200, description: 'Active group split details' })
  async getSplitSession(@Param('id') id: string) {
    const data = await this.splitService.getSplit(id);
    return {
      success: true,
      data
    };
  }

  @Post(':id/pay')
  @ApiOperation({ summary: 'Settle individual traveler share via Telebirr or CBE Birr' })
  @ApiResponse({ status: 200, description: 'Individual share recorded as paid in escrow' })
  async payMemberShare(
    @Param('id') id: string,
    @Body() body: { seat: string; name: string; phone: string; method: string }
  ) {
    return await this.splitService.payShare(id, body);
  }
}
