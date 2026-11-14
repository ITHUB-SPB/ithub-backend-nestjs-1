import { vi } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { DogsController } from './dogs.controller.js';
import { DogsService } from './dogs.service.js';

describe('DogsController', () => {
  let controller: DogsController;
  let service: DogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DogsController],
      providers: [DogsService],
    }).compile();

    controller = module.get<DogsController>(DogsController);
    service = module.get<DogsService>(DogsService);
  });

  it('контроллер определен', () => {
    expect(controller).toBeDefined();
  });

  it('возвращает массив собак', () => {
    const dogs = [{ id: 1, name: 'alf', age: 10 }];

    vi.spyOn(service, 'findAll').mockImplementation(() => dogs);
    expect(controller.findAll('')).toBe(dogs);
  });

  it('добавляет и возвращает новую собаку', () => {
    const newDog = { id: 1, name: 'alf', age: 10 };

    vi.spyOn(service, 'create').mockImplementation(() => newDog);

    expect(controller.create(newDog)).toBe(newDog);
    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith('alf', 10);
    expect(service.create).toHaveReturnedWith(newDog);
  });

  // дописать автотест (1 балл)
  it('обновляет и возвращает обновленную собаку', () => { })
});
