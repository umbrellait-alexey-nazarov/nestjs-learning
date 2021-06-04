import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  getTags(): Array<string> {
    return ['umbrella', 'it'];
  }
}
