
import {
  Controller,Get,Post,Patch,Body,Param,Query,DefaultValuePipe,ParseIntPipe,NotFoundException,StandardSchemaValidationPipe,UseFilters,
} from '@nestjs/common';

import {ApiOperation,ApiQuery,ApiResponse,ApiCreatedResponse,ApiNotFoundResponse,ApiUnprocessableEntityResponse,ApiBody,
} from '@nestjs/swagger';

import * as z from 'zod';

import { DogsService } from './dogs.service.js';
import type { Dog } from './dogs.interface.js';
import { CreateDogDto } from './dogs.dto.js';

import { ZodPipe } from '../common/pipes/zod.pipe.js';
import { ZodExceptionFilter } from '../common/filters/zod-exception.filter.js';

const createDogSchema = z.object({
  name: z.string().nonempty(),
  age: z.coerce.number().int().min(0),
});

const updateDogSchema = z.object({
  id: z.coerce.number().int().min(1),
  value: z.coerce.number().int().min(0),
});

@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {} //подключаем DogsService к DogsController

  @ApiOperation({ summary: 'Получить список собак' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Поиск собаки по имени',
  })
  @ApiResponse({
    status: 200,
    description: 'Список собак',
  })
  @Get()
  findAll(
    @Query('search', new DefaultValuePipe(null))
    search: string | null,
  ): Dog[] {
    return this.dogsService.findAll(search);
  }

  @ApiOperation({ summary: 'Получить собаку по ID' })
  @ApiResponse({
    status: 200,
    description: 'Найдена собака',
  })
  @ApiNotFoundResponse({
    description: 'Собака не найдена',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Dog {
    const dog = this.dogsService.findOne(id);

    if (!dog) {
      throw new NotFoundException('Пёс не найден');
    }

    return dog;
  }

  @ApiOperation({ summary: 'Добавить новую собаку' })
  @ApiBody({ type: CreateDogDto })
  @ApiUnprocessableEntityResponse({
    description: 'Некорректные входные данные',
  })
  @ApiCreatedResponse({
    description: 'Собака успешно добавлена',
  })
  @UseFilters(ZodExceptionFilter)
  @Post()
  create(
    @Body({
      schema: createDogSchema,
      pipes: [StandardSchemaValidationPipe],
    })
    createDogDto: CreateDogDto,
  ): Dog {
    return this.dogsService.create(
      createDogDto.name,
      createDogDto.age,
    );
  }

  @ApiOperation({ summary: 'Обновить возраст собаки' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        value: { type: 'number', example: 5 },
      },
      required: ['id', 'value'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Собака обновлена',
  })
  @ApiNotFoundResponse({
    description: 'Собака не найдена',
  })
  @UseFilters(ZodExceptionFilter)
  @Patch()
  update(
    @Body({
      schema: updateDogSchema,
      pipes: [ZodPipe],
    })
    updateDogDto: z.infer<typeof updateDogSchema>,
  ): Dog {
    const updatedDog = this.dogsService.update(
      updateDogDto.id,
      updateDogDto.value,
    );

    if (!updatedDog) {
      throw new NotFoundException('Пёс не найден');
    }

    return updatedDog;
  }
}
