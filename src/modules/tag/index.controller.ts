import { Controller, Get } from '@nestjs/common';
import { TagService } from './index.service';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  findAll(): Array<string> {
    return this.tagService.getTags();
  }
}
