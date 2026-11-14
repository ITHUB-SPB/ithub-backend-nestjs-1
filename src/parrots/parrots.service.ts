import { Injectable } from '@nestjs/common';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { Parrot } from './entities/parrot.entity.js';

@Injectable()
export class ParrotsService {
  private parrots: Parrot[] = [];
  private nextId = 1;

  create(createParrotDto: CreateParrotDto): Parrot {
    const parrot: Parrot = {
      id: this.nextId++,
      name: createParrotDto.name,
      breed: createParrotDto.breed,
    };

    this.parrots.push(parrot);
    return parrot;
  }

  findAll(): Parrot[] {
    return this.parrots;
  }

  findOne(id: number): Parrot | null {
    return this.parrots.find((parrot) => parrot.id === id) ?? null;
  }

  update(id: number, updateParrotDto: UpdateParrotDto): Parrot | null {
    const parrot = this.findOne(id);

    if (!parrot) {
      return null;
    }

    if (updateParrotDto.name !== undefined) {
      parrot.name = updateParrotDto.name;
    }

    if (updateParrotDto.breed !== undefined) {
      parrot.breed = updateParrotDto.breed;
    }

    return parrot;
  }
}