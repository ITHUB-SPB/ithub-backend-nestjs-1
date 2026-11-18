
import { Test, TestingModule } from '@nestjs/testing';
import { ParrotsController } from './parrots.controller.js';
import { ParrotsService } from './parrots.service.js';

describe('ParrotsController', () => {
  let controller: ParrotsController;
  let service: ParrotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ParrotsController],
      providers: [ParrotsService],
    }).compile();

    controller = module.get<ParrotsController>(ParrotsController);
    service = module.get<ParrotsService>(ParrotsService);
  });

  it('контроллер определен', () => {
    expect(controller).toBeDefined();
  });

  it('реализовано создание попугая', () => {
    const parrot = { breed: 'red', name: 'kesha' };

    expect(controller.create(parrot)).toStrictEqual({id: 2,...parrot,});
  });

  it('реализовано получение списка попугаев', () => {
    controller.create({ name: 'kesha', breed: 'red' });
    expect(controller.findAll()).toHaveLength(2);
  });

  it('реализовано получение попугая по id', () => {
    const parrot = controller.create({name: 'kesha',breed: 'red'});
    expect(controller.findOne(parrot.id)).toStrictEqual(parrot);
  });

  it('реализовано обновление попугая', () => {
    const updatedParrot = controller.update(1, {name: 'boba',});
    expect(updatedParrot?.name).toBe('boba');
  });

  it('сервис доступен', () => {
    expect(service).toBeDefined();
  });
});
