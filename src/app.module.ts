import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TagModule } from '@app/modules/tag/index.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/index.module';
import { AuthMiddleware } from './modules/user/midllewares/auth.middleware';

const DB_URI: string = process.env.DB_URI;

@Module({
  imports: [TagModule, MongooseModule.forRoot(DB_URI), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
