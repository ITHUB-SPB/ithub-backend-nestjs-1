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
    expect(service.findAll()).toStrictEqual(dogs);
  });

  it('сервис реализует добавление собаки', () => {
    const newDog = { id: 2, name: 'alf', age: 10 };
    expect(service.create('alf', 10)).toStrictEqual(newDog);
  });

// дописать автотест (1 балл)
it('сервис реализует выдачу собаки по id', () => {
  expect(service.findOne(1)).toStrictEqual({
    id: 1,
    name: 'rex',
    age: 3
  });

  expect(service.findOne(999)).toBeNull();
});

// дописать автотест (1 балл)
it('сервис реализует обновление собаки', () => {
  const updatedDog = service.update(1, 5);

  expect(updatedDog).toStrictEqual({
    id: 1,
    name: 'rex',
    age: 5
  });

  expect(service.update(999, 5)).toBeNull();
});
});
