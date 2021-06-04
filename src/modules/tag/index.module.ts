import { Module } from '@nestjs/common';
import { TagController } from './index.controller';
import { TagService } from './index.service';

@Module({
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
