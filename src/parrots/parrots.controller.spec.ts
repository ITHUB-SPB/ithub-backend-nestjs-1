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

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // дописать автотест (1 балл)victory
  it('реализовано создание попугая', () => {
    const createDto = {
      name: 'alf',
      breed: 'red',
    };

    const newParrot = {
      id: 2,
      ...createDto,
    };

    vi.spyOn(service, 'create').mockReturnValue(newParrot);

    expect(controller.create(createDto)).toBe(newParrot);
    expect(service.create).toHaveBeenCalledWith(createDto);
    expect(service.create).toHaveReturnedWith(newParrot);
  });

  // дописать автотест (1 балл) victory
  it('реализовано получение списка попугаев', () => {
    const parrots = [{ id: 2, name: 'alf', breed: "red" }];

    vi.spyOn(service, 'findAll').mockImplementation(() => parrots);
    expect(controller.findAll('')).toBe(parrots);
  });

  // дописать автотест (1 балл)
  it('реализовано получение попугая по id', () => { });

  // дописать автотест (1 балл) victory
  it('реализовано обновление попугая', () => {
    const updateDto = {
      id: 1,
      breed: 'red',
    };

    const updatedParrot = {
      id: 1,
      name: 'Кеша',
      breed: 'red',
    };

    vi.spyOn(service, 'update').mockReturnValue(updatedParrot);

    expect(controller.update(1, updateDto)).toEqual(updatedParrot);
    expect(service.update).toHaveBeenCalledWith(1, updateDto);
  });
});
