import { Injectable } from '@nestjs/common';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { Parrot } from './parrots.interface.js';

@Injectable()
export class ParrotsService {
  private parrots: Parrot[];

  constructor() {
    this.parrots = [{ id: 1, name: 'rex', breed: "red" }];
  }

  // реализовать и типизировать (1 балл) victory
  create(createParrotDto: CreateParrotDto): Parrot {
    const lastId = this.parrots.length
      ? Math.max(...this.parrots.map(({ id }) => id))
      : 0;

    const newParrot: Parrot = {
      id: lastId + 1,
      name: createParrotDto.name,
      breed: createParrotDto.breed,
    };

    this.parrots.push(newParrot);
    return newParrot;
  }

  // реализовать и типизировать  (1 балл) victory
  findAll(search: string | null): Parrot[] {
    if (!search) {
      return this.parrots;
    }
    return this.parrots.filter((parrot) => parrot.name.includes(search));
  }

  // реализовать и типизировать  (1 балл) victory
  findOne(id: number): Parrot | null {
    return this.parrots.find((parrot) => parrot.id == id) ?? null;
  }

  // реализовать и типизировать (1 балл) victory
  update(id: number, updateParrotDto: UpdateParrotDto): Parrot | null {
    const record = this.parrots.find((parrot) => parrot.id === id);

    if (!record) {
      return null;
    }

    record.breed = updateParrotDto.breed;
    if (updateParrotDto.name) {
      record.name = updateParrotDto.name;
    }

    return record;
  }
}
