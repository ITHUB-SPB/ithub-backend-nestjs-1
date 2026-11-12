import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { DogsController } from './dogs.controller.js';
import { DogsService } from './dogs.service.js';
  import { AuthMiddleware } from '../common/middleware/auth.middleware.js';

@Module({
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '/dogs',
      method: RequestMethod.POST,
    })
  }
}
