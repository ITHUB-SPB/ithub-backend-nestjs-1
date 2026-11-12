import { Test, TestingModule } from '@nestjs/testing';
import { ParrotsService } from './parrots.service.js';

describe('ParrotsService', () => {
  let service: ParrotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ParrotsService],
    }).compile();

    service = module.get<ParrotsService>(ParrotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // дописать автотест (1 балл)
  it('сервис реализует создание попугая', () => { });

  // дописать автотест (1 балл)
  it('сервис реализует получение списка попугаев', () => { });

  // дописать автотест (1 балл)
  it('сервис реализует получение попугая по id', () => { });

  // дописать автотест (1 балл)
  it('сервис реализует обновление попугая', () => { });
});
