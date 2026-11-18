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

  it('сервис реализует создание попугая', () => {
    const newParrot = { id: 2, name: 'kesha', breed: 'blue' };

    expect(service.create({ name: 'kesha', breed: 'blue' })).toStrictEqual(
      newParrot,
    );
  });

  it('сервис реализует получение списка попугаев', () => {
    const parrots = [{ id: 1, name: 'kesha', breed: 'blue' }];

    expect(service.findAll()).toStrictEqual(parrots);
  });

  it('сервис реализует получение попугая по id', () => {
    const parrot = { id: 1, name: 'kesha', breed: 'blue' };

    expect(service.findOne(1)).toStrictEqual(parrot);
    expect(service.findOne(100)).toBeNull();
  });

  it('сервис реализует обновление попугая', () => {
    const updatedParrot = service.update(1, {
      name: 'boba',
      breed: 'red',
    });

    expect(updatedParrot?.name).toBe('boba');
    expect(updatedParrot?.breed).toBe('red');
    expect(service.update(100, { name: 'boba' })).toBeNull();
  });
});
