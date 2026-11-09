import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  private cats: string[];

  constructor() {
    this.cats = ['musya', 'dusya'];
  }

  findAll(search: string | null) {
    if (!search) {
      return this.cats;
    }
    return this.cats.filter((name) => name.includes(search));
  }

  findOne(id: number) {
    return this.cats[id];
  }

  create(name: string) {
    this.cats.push(name);
    return this.cats.at(-1)!;
  }
}
