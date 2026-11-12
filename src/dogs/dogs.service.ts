import { Injectable } from '@nestjs/common';
import type { Dog } from './dogs.interface.js';

@Injectable()
export class DogsService {
  private dogs: Dog[];

  constructor() {
    this.dogs = [{ id: 1, name: 'rex', age: 3 }];
  }

  // дописать реализацию, обрабатывать строку поиска (1 балл)
  findAll(): Dog[] {
    return this.dogs;
  }

  // дописать реализацию в соответствии с контроллером (1 балл)
  findOne() { }

  create(name: string, age: number): Dog {
    const lastId = Math.max(...this.dogs.map(({ id }) => id))
    this.dogs.push({ id: lastId + 1, name, age });
    return this.dogs.at(-1)!;
  }

  update(id: number, newAge: number): Dog | null {
    const record = this.dogs.find((dog) => dog.id === id)

    if (!record) {
      return null
    }

    record.age = newAge
    return record;
  }

}
