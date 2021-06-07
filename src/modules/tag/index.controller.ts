import { Tag } from '@app/modules/tag/schemas/tag.schema';
import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { TagService } from './index.service';
import { CreateTagDto } from './dto/tag.dto';

@Controller('tags')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findAll(): Promise<{ tags: string[] }> {
    const tags = await this.tagService.findAll();
    return {
      tags: tags.map((tag) => tag.name),
    };
  }

  @Get('/test')
  getString(@Req() request: any): string {
    return 'Just testing';
  }

  @Post()
  async create(@Body() createTagDto: CreateTagDto): Promise<Tag> {
    return this.tagService.create(createTagDto);
  }
}
