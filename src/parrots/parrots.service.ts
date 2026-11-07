import { Injectable } from '@nestjs/common';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';

@Injectable()
export class ParrotsService {
  create(createParrotDto: CreateParrotDto) {
    return 'This action adds a new parrot';
  }

  findAll() {
    return `This action returns all parrots`;
  }

  findOne(id: number) {
    return `This action returns a #${id} parrot`;
  }

  update(id: number, updateParrotDto: UpdateParrotDto) {
    return `This action updates a #${id} parrot`;
  }

  remove(id: number) {
    return `This action removes a #${id} parrot`;
  }
}
