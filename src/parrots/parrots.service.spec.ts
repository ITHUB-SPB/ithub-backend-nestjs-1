import { Test, TestingModule } from '@nestjs/testing';
import { ParrotsService } from './parrots.service.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';

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
    const newParrot = { id: 3, name: 'pop3', breed: 'third' };
    const result = service.create({ name: 'pop3', breed: 'third' });
    expect(result).toStrictEqual(newParrot);
  });

  // дописать автотест (1 балл)
  it('сервис реализует получение списка попугаев', () => {
    const parrots = [
      { id: 1, name: 'pop1', breed: 'first' },
      { id: 2, name: 'pop2', breed: 'second' },
    ];
    expect(service.findAll()).toStrictEqual(parrots);
  });

  // дописать автотест (1 балл)
  it('сервис реализует получение попугая по id', () => {
    const parrot = { id: 1, name: 'pop1', breed: 'first' };
    const id = 1;
    const result = service.findOne(id);
    expect(result).toStrictEqual(parrot);
  });

  // дописать автотест (1 балл)
  it('сервис реализует обновление попугая', () => {
    const updateParrotDto: UpdateParrotDto = { breed: 'new-breed' };
    const result = service.update(1, updateParrotDto);
    expect(result).toStrictEqual({ id: 1, name: 'pop1', breed: 'new-breed' });
  });
});
