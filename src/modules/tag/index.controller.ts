import { Tag } from '@app/modules/tag/tagSchema';
import { Controller, Get, Post } from '@nestjs/common';
import { TagService } from './index.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): Promise<Tag[]> {
    return this.tagService.findAll();
  }

  @Post()
  create(): Promise<Tag> {
    return this.tagService.create({ name: 'new tag' });
  }
}
