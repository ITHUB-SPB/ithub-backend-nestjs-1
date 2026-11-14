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
it('сервис реализует создание попугая', () => {
  const parrot = service.create({
    name: 'Kesha',
    breed: 'Macaw'
  });

  expect(parrot).toStrictEqual({
    id: 1,
    name: 'Kesha',
    breed: 'Macaw'
  });
});

// дописать автотест (1 балл)
it('сервис реализует получение списка попугаев', () => {
  const parrot = service.create({
    name: 'Kesha',
    breed: 'Macaw'
  });

  expect(service.findAll()).toStrictEqual([parrot]);
});

// дописать автотест (1 балл)
it('сервис реализует получение попугая по id', () => {
  const parrot = service.create({
    name: 'Kesha',
    breed: 'Macaw'
  });

  expect(service.findOne(parrot.id)).toStrictEqual(parrot);
  expect(service.findOne(999)).toBeNull();
});

// дописать автотест (1 балл)
it('сервис реализует обновление попугая', () => {
  const parrot = service.create({
    name: 'Kesha',
    breed: 'Macaw'
  });

  const updated = service.update(parrot.id, {
    name: 'Gosha'
  });

  expect(updated).toStrictEqual({
    id: 1,
    name: 'Gosha',
    breed: 'Macaw'
  });
});
});
