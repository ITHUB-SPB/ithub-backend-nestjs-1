import { ApiBearerAuth } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  HttpException,
  Param,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
  UseFilters,
  UseGuards,
  HttpStatus,
  StandardSchemaValidationPipe,
} from '@nestjs/common';
import { ApiBody, ApiParam, ApiQuery, ApiResponse } from '@nestjs/swagger';
import * as z from 'zod';
import {
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiUnprocessableEntityResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { CreateDogDto, UpdateDogDto } from './dogs.dto.js';
import { DogsService } from './dogs.service.js';
import { type Dog } from './dogs.interface.js';
import { NumericSelectPipe } from '../common/pipes/select.pipe.js';

import { ZodExceptionFilter } from '../common/filters/zod-exception.filter.js';
import { ZodPipe } from '../common/pipes/zod.pipe.js';
import { AuthGuard } from '../common/guards/auth.guard.js';

const createDogSchema = z.object({
  name: z.string().nonempty(),
  age: z.coerce.number().int().min(0),
});

const dogSchema = z.object({
  id: z.int().min(1),
  name: z.string().nonempty(),
  age: z.coerce.number().int().min(0),
});

@ApiBearerAuth()
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  // задекорировать api-спецификацию (1 балл)
  // @ApiOperation, @ApiResponse
  @ApiOperation({
    summary: 'собак получить',
    description: 'получает собак',
  })
  @ApiQuery({
    name: 'search',
    required: false,
    default: null,
  })
  @ApiResponse({
    status: 200,
    description: 'список собак есть',
    isArray: true,
  })
  @Get()
  findAll(@Query('search', new DefaultValuePipe(null)) search: string): Dog[] {
    return this.dogsService.findAll(search);
  }

  // задекорировать api-спецификацию (1 балл)
  // @ApiOperation, @ApiQuery, @ApiResponse
  // @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'собаку одну получить',
    description: 'получает собаку по айди',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'айди собаки',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'собака есть',
  })
  @ApiResponse({ status: 404, description: 'Пёс не найден' })
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Dog {
    const record = this.dogsService.findOne(id);

    if (!record) {
      throw new HttpException('пес не найден', HttpStatus.NOT_FOUND);
    }

    return record;
  }

  @ApiOperation({ summary: 'Добавить нового пса' })
  @ApiUnprocessableEntityResponse({
    description: 'Некорректные входные данные',
  })
  @ApiConflictResponse({ description: 'Запись уже существует' })
  @ApiCreatedResponse({ description: 'Информация о добавленной записи' })
  // @UseFilters(ZodExceptionFilter)
  @Post()
  create(
    @Body({ schema: createDogSchema, pipes: [StandardSchemaValidationPipe] })
    createDogDto: CreateDogDto,
  ): Dog {
    return this.dogsService.create(createDogDto.name, createDogDto.age);
  }

  // задекорировать api-спецификацию (1 балл)
  // @ApiOperation, @ApiBody, @ApiResponse
  @ApiOperation({
    summary: 'менять собаку',
    description: 'меняет собаку по дто схеме',
  })
  @ApiBody({
    type: UpdateDogDto,
    description: 'обновляет собаку по дто',
  })
  @ApiResponse({
    status: 200,
    description: 'собака изменена',
  })
  @Patch()
  update(@Body() updateDogDto: UpdateDogDto): Dog {
    const updatedDog = this.dogsService.update(
      updateDogDto.id,
      updateDogDto.value,
    );

    if (!updatedDog) {
      throw new HttpException('Пёс не найден', HttpStatus.NOT_FOUND);
    }

    return updatedDog;
  }
}
