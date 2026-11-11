import { Controller, Get, Post, Body, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { CreateDogDto, UpdateDogDto } from './dogs.dto.js';
import { DogsService } from './dogs.service.js';
import { type Dog } from './dogs.interface.js';
import { NumericSelectPipe } from '../common/pipes/select.pipe.js';

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) { }

  @Get()
  findMany(): Dog[] {
    return this.dogsService.findAll();
  }

  @Post()
  create(@Body() createDogDto: CreateDogDto): Dog {
    return this.dogsService.create(createDogDto.name, createDogDto.age);
  }

  @Patch()
  update(@Body(NumericSelectPipe) updateDogDto: UpdateDogDto): Dog {
    const updatedDog = this.dogsService.update(updateDogDto.id, updateDogDto.value);

    if (!updatedDog) {
      throw new HttpException('Пёс не найден', HttpStatus.NOT_FOUND)
    }

    return updatedDog;
  }
}
