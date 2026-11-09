import { Module } from '@nestjs/common';
import { DogsController } from './dogs.controller.js';
import { DogsService } from './dogs.service.js';

@Module({
  controllers: [DogsController],
  providers: [DogsService]
})
export class DogsModule {}
