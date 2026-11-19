import { Injectable } from '@nestjs/common';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { Parrot } from './entities/parrot.entity.js';

@Injectable()
export class ParrotsService {
  private parrots: Parrot[];
  constructor() {
    this.parrots = [
      {
        id: 1,
        name: 'pop1',
        breed: 'first',
      },
      {
        id: 2,
        name: 'pop2',
        breed: 'second',
      },
    ];
  }
  // реализовать и типизировать (1 балл)
  create(createParrotDto: CreateParrotDto): Parrot {
    const lastId = this.parrots.length
      ? Math.max(...this.parrots.map(({ id }) => id))
      : 0;
    const parrot: Parrot = { id: lastId + 1, ...createParrotDto };
    this.parrots.push(parrot);
    return parrot;
  }

  // реализовать и типизировать  (1 балл)
  findAll(): Parrot[] {
    return this.parrots;
  }

  // реализовать и типизировать  (1 балл)
  findOne(id: number): Parrot | undefined {
    return this.parrots.find((p) => p.id === id);
  }

  // реализовать и типизировать (1 балл)
  update(id: number, updateParrotDto: UpdateParrotDto): Parrot | undefined {
    const parrot = this.findOne(id);
    if (!parrot) {
      return undefined;
    }
    Object.assign(parrot, updateParrotDto);
    return parrot;
  }
}
