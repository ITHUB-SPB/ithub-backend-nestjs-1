import { Module } from '@nestjs/common';
import { ParrotsService } from './parrots.service.js';
import { ParrotsController } from './parrots.controller.js';

@Module({
  controllers: [ParrotsController],
  providers: [ParrotsService],
})
export class ParrotsModule {}
