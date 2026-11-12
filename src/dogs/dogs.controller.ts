import { Controller, Get, Post, Body, Patch, HttpException, Param, DefaultValuePipe, ParseIntPipe, Query, UseFilters, UseGuards, HttpStatus, StandardSchemaValidationPipe } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import * as z from 'zod'
import { ApiCreatedResponse, ApiConflictResponse, ApiUnprocessableEntityResponse, ApiOperation } from '@nestjs/swagger'
import { CreateDogDto, UpdateDogDto } from './dogs.dto.js';
import { DogsService } from './dogs.service.js';
import { type Dog } from './dogs.interface.js';
import { NumericSelectPipe } from '../common/pipes/select.pipe.js';

import { ZodExceptionFilter } from '../common/filters/zod-exception.filter.js';
import { ZodPipe } from '../common/pipes/zod.pipe.js';
import { AuthGuard } from '../common/guards/auth.guard.js';


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

  // задекорировать api-спецификацию (1 балл)
  // @ApiOperation, @ApiResponse
  @ApiQuery({
    name: 'search',
    required: false,
    default: null
  })
  @Get()
  findAll(@Query('search', new DefaultValuePipe(null)) search: string): Dog[] {
    return this.dogsService.findAll(search);
  }

  // задекорировать api-спецификацию (1 балл)
  // @ApiOperation, @ApiQuery, @ApiResponse
  // @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    const record = this.dogsService.findOne(id)

    if (!record) {
      throw new HttpException('Кот не найден', HttpStatus.NOT_FOUND)
    }

    return record;
  }

  @ApiOperation({ summary: 'Добавить нового пса' })
  @ApiUnprocessableEntityResponse({ description: "Некорректные входные данные" })
  @ApiConflictResponse({ description: "Запись уже существует" })
  @ApiCreatedResponse({ description: "Информация о добавленной записи" })
  // @UseFilters(ZodExceptionFilter)
  @Post()
  create(@Body({ schema: createDogSchema, pipes: [StandardSchemaValidationPipe] }) createDogDto: CreateDogDto): Dog {
    return this.dogsService.create(createDogDto.name, createDogDto.age);
  }

  // задекорировать api-спецификацию (1 балл)
  // @ApiOperation, @ApiBody, @ApiResponse
  @Patch()
  update(
    @Body({ schema: updateDogSchema, pipes: [ZodPipe] })
    updateDogDto: z.infer<typeof updateDogSchema>,
  ): Dog {
    const updatedDog = this.dogsService.update(updateDogDto.id, updateDogDto.value);

    if (!updatedDog) {
      throw new HttpException('Пёс не найден', HttpStatus.NOT_FOUND)
    }

    return updatedDog;
  }
}
