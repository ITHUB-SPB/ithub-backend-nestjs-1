import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from './dogs.service.js';

describe('ParrotsService', () => {
  let service: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DogsService],
    }).compile();

    service = module.get<DogsService>(DogsService);
  });

  it('провайдер определен', () => {
    expect(service).toBeDefined();
  });

  it('сервис возвращает массив собак', () => {
    const dogs = [{ name: 'rex', age: 3 }];
    expect(service.findAll()).toStrictEqual(dogs);
  });

  it('сервис реализует добавление собаки', () => {
    const newDog = { name: 'alf', age: 10 };
    expect(service.create('alf', 10)).toStrictEqual(newDog);
  });
});
