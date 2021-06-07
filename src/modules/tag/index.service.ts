import { Tag, TagDocument } from '@app/modules/tag/schemas/tag.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  async create(data: CreateTagDto): Promise<Tag> {
    const newTag = new this.tagModel(data);
    return newTag.save();
  }

  async findAll(): Promise<Tag[]> {
    const result = await this.tagModel.find();
    return result;
  }
}
