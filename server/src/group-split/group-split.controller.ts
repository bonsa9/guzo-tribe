import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { GroupSplitService } from './group-split.service';

@Controller('group-split')
export class GroupSplitController {
  constructor(private readonly splitService: GroupSplitService) {}

  @Post('create')
  async createSplit(@Body() body: any) {
    const data = await this.splitService.createSplit(body);
    return {
      success: true,
      message: 'Coaster seats locked for 60 minutes. Share group link.',
      data
    };
  }

  @Get(':id')
  async getSplitSession(@Param('id') id: string) {
    const data = await this.splitService.getSplit(id);
    return {
      success: true,
      data
    };
  }

  @Post(':id/pay')
  async payMemberShare(
    @Param('id') id: string,
    @Body() body: { seat: string; name: string; phone: string; method: string }
  ) {
    return await this.splitService.payShare(id, body);
  }
}
