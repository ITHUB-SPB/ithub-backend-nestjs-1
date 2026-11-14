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

  it('реализовано создание попугая', () => {
    const parrot = controller.create({
      name: 'Kesha',
      breed: 'Macaw',
    });

    expect(parrot).toEqual({
      id: 1,
      name: 'Kesha',
      breed: 'Macaw',
    });
  });

  it('реализовано получение списка попугаев', () => {
    const parrot = controller.create({
      name: 'Kesha',
      breed: 'Macaw',
    });

    expect(controller.findAll()).toEqual([parrot]);
  });

  it('реализовано получение попугая по id', () => {
    const parrot = controller.create({
      name: 'Kesha',
      breed: 'Macaw',
    });

    expect(controller.findOne(parrot.id)).toEqual(parrot);
  });

  it('реализовано обновление попугая', () => {
    const parrot = controller.create({
      name: 'Kesha',
      breed: 'Macaw',
    });

    const updated = controller.update(parrot.id, {
      name: 'Gosha',
    });

    expect(updated).toEqual({
      id: 1,
      name: 'Gosha',
      breed: 'Macaw',
    });
  });
});
