import { Injectable } from '@nestjs/common';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { Parrot } from './entities/parrot.entity.js';

@Injectable()
export class ParrotsService {
  // реализовать и типизировать (1 балл)
  private parrots: Parrot[] = [
    { id: 1, name: 'kesha', breed: 'blue' },
  ]; 
   create(createParrotDto: CreateParrotDto): Parrot {
        const lastId = Math.max(
      0,
      ...this.parrots.map((parrot) => parrot.id),
    );

    const newParrot: Parrot = {
      id: lastId + 1,
      name: createParrotDto.name,
      breed: createParrotDto.breed,
    }
    this.parrots.push(newParrot);
    return newParrot;
  }

  // реализовать и типизировать  (1 балл)
  findAll(search: string | null = null): Parrot[] {
    if (!search) {
      return this.parrots;
    }
     return this.parrots.filter((parrot) =>
      parrot.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // реализовать и типизировать  (1 балл)
  findOne(id: number): Parrot | null {
    return this.parrots.find((parrot) => parrot.id === id)  ?? null
  }

  // реализовать и типизировать (1 балл)
  update(id: number, updateParrotDto: UpdateParrotDto): Parrot | null {
    const parrot = this.parrots.find((parrot) => parrot.id === id)
    if(!parrot){
      return null;
    }
    if (updateParrotDto.name != undefined) {
      parrot.name = updateParrotDto.name;
    }
    if(updateParrotDto.breed != undefined){
      parrot.breed = updateParrotDto.breed
    }
    return parrot;
  }
}

