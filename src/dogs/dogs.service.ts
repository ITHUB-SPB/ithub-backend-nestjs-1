import { Injectable } from '@nestjs/common';
import type { Dog } from './dogs.interface.js';

@Injectable()
export class DogsService {
  private dogs: Dog[];

  constructor() {
    this.dogs = [{ name: 'rex', age: 3 }];
  }

  findAll(): Dog[] {
    return this.dogs;
  }

  create(name: string, age: number): Dog {
    this.dogs.push({ name, age });
    return this.dogs.at(-1)!;
  }
}
