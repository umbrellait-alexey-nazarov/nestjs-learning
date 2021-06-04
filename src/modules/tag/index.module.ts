import { Tag, TagSchema } from '@app/modules/tag/tagSchema';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './index.controller';
import { TagService } from './index.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }])],
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
