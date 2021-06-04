import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from '@app/modules/tag/index.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    TagModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27020/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
