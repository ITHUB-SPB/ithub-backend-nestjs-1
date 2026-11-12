import { Injectable } from '@nestjs/common';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';

@Injectable()
export class ParrotsService {
  // реализовать и типизировать (1 балл)
  create(createParrotDto: CreateParrotDto) {
    return 'This action adds a new parrot';
  }

  // реализовать и типизировать  (1 балл)
  findAll() {
    return `This action returns all parrots`;
  }

  // реализовать и типизировать  (1 балл)
  findOne(id: number) {
    return `This action returns a #${id} parrot`;
  }

  // реализовать и типизировать (1 балл)
  update(id: number, updateParrotDto: UpdateParrotDto) {
    return `This action updates a #${id} parrot`;
  }
}
