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
    const dogs = [{ id: 1, name: 'rex', age: 3 }];
    expect(service.findAll(null)).toStrictEqual(dogs);
  });

  it('сервис реализует добавление собаки', () => {
    const newDog = { id: 1, name: 'alf', age: 10 };
    expect(service.create('alf', 10)).toStrictEqual(newDog);
  });

  // дописать автотест (1 балл)
  it('сервис реализует выдачу собаки по id', () => {
    const dog = { id: 1, name: 'rex', age: 3 };
    const id = 1;
    const result = service.findOne(id);
    expect(result).toStrictEqual(dog);
  });

  // дописать автотест (1 балл)
  it('сервис реализует обновление собаки', () => {
    const dog = { id: 1, name: 'rex', age: 4 };
    const result = service.update(1, 4);
    expect(result).toStrictEqual(dog);
  });
});
