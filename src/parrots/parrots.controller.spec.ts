import { Test, TestingModule } from '@nestjs/testing';
import { ParrotsController } from './parrots.controller.js';
import { ParrotsService } from './parrots.service.js';

describe('ParrotsController', () => {
  let controller: ParrotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParrotsController],
      providers: [ParrotsService],
    }).compile();

    controller = module.get<ParrotsController>(ParrotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // TODO: КТ
});
