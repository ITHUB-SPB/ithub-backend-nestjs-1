import { Controller, Get, Post, Body, Patch, HttpException, HttpStatus, StandardSchemaValidationPipe } from '@nestjs/common';
import * as z from 'zod'
import { ApiCreatedResponse, ApiConflictResponse, ApiUnprocessableEntityResponse, ApiOperation } from '@nestjs/swagger'
import { CreateDogDto, UpdateDogDto } from './dogs.dto.js';
import { DogsService } from './dogs.service.js';
import { type Dog } from './dogs.interface.js';
import { NumericSelectPipe } from '../common/pipes/select.pipe.js';


const createDogSchema = z.object({
  name: z.string().nonempty(),
  age: z.coerce.number().int().min(0)
})

const dogSchema = z.object({
  id: z.int().min(1),
  name: z.string().nonempty(),
  age: z.coerce.number().int().min(0)
})

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) { }

  @Get()
  findMany(): Dog[] {
    return this.dogsService.findAll();
  }

  @ApiOperation({ summary: 'Добавить нового пса' })
  @ApiUnprocessableEntityResponse({ description: "Некорректные входные данные" })
  @ApiConflictResponse({ description: "Запись уже существует" })
  @ApiCreatedResponse({ description: "Информация о добавленной записи" })
  @Post()
  create(@Body({ schema: createDogSchema, pipes: [StandardSchemaValidationPipe] }) createDogDto: CreateDogDto): Dog {
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
