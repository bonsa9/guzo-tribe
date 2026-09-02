import { Module } from '@nestjs/common';
import { GroupSplitController } from './group-split.controller';
import { GroupSplitService } from './group-split.service';

@Module({
  controllers: [GroupSplitController],
  providers: [GroupSplitService],
  exports: [GroupSplitService]
})
export class GroupSplitModule {}
