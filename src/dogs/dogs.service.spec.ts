import { Test, TestingModule } from '@nestjs/testing';
import { DogsService } from './dogs.service.js';

describe('DogsService', () => {
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

  it('сервис реализует выдачу собаки по id', () => {
    const dog = { id: 1, name: 'rex', age: 3 };

    expect(service.findOne(1)).toStrictEqual(dog);
    expect(service.findOne(100)).toBeNull();
  });
  // дописать автотест (1 балл)
  it('сервис реализует обновление собаки', () => {
    const updatedDog = { id: 1, name: 'rex', age: 5 };

    expect(service.update(1, 5)).toStrictEqual(updatedDog);
    expect(service.update(100, 5)).toBeNull();
  });
  // дописать автотест (1 балл)
  it('сервис ищет собак по имени', () => {
    expect(service.findAll('rex')).toHaveLength(1);
    expect(service.findAll('unknown')).toHaveLength(0);
  });
});
