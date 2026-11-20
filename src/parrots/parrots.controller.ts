import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  DefaultValuePipe,
  Query,
  ParseIntPipe,
  HttpException,
  HttpStatus,
  StandardSchemaValidationPipe,
} from '@nestjs/common';
import * as z from 'zod'
import { ApiQuery, ApiResponse, ApiOperation, ApiCreatedResponse, ApiConflictResponse, ApiUnprocessableEntityResponse, ApiBody } from '@nestjs/swagger';
import { ParrotsService } from './parrots.service.js';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { ClassValidatorPipe } from '../common/pipes/class-validator.pipe.js';
import { type Parrot } from './parrots.interface.js';

const UpdateProotSchema = z.object({
  breed: z.string().nonempty(),
  name: z.string().nonempty().optional(),
});

const createParrotSchema = z.object({
  name: z.string().nonempty(),
  breed: z.string().nonempty()
})

@Controller('parrots')
export class ParrotsController {
  constructor(private readonly parrotsService: ParrotsService) { }

  // задекорировать api-спецификацию, дописать возвращаемый тип (1 балл); victory
  // 
  // реализовать фильтр для обработки исключений, выбрасываемых пайпом 
  // `class-validator.pipe.ts`, по аналогии с фильтром `zod-exception.filter.ts`, 
  // для стандартизации формата ответов в случае ошибок валидации (1 балл); victory

  @ApiOperation({ summary: 'Добавить нового попугая' })
  @ApiUnprocessableEntityResponse({ description: "Некорректные входные данные" })
  @ApiConflictResponse({ description: "Запись уже существует" })
  @ApiCreatedResponse({ description: "Информация о добавленной записи" })
  @Post()
  create(@Body({ schema: createParrotSchema, pipes: [ClassValidatorPipe] }) createParrotDto: CreateParrotDto): Parrot {
    return this.parrotsService.create(createParrotDto);
  }
  
  // задекорировать api-спецификацию, дописать возвращаемый тип  (1 балл) victory
  @ApiQuery({
    name: 'search',
    required: false,
    default: null
  })
  @Get()
  @ApiOperation({
    summary: 'Получить список все попугаев.',
    description: 'Возвращает попугаев собак из системы.',
  })
  @ApiResponse({ status: 200, description: 'Список попугаев.',  })
  findAll(@Query('search', new DefaultValuePipe(null)) search: string): Parrot[] {
    return this.parrotsService.findAll(search);
  }

  // задекорировать api-спецификацию (1 балл) victory
  // валидировать id, добавить возвращаемый тип (1 балл) victory
  // в случае отсутствия записи выбрасывать верное исключение (1 балл) victory
  @Get(':id')
  @ApiOperation({
    summary: 'Получить информацию по одной конкретной попугаю.',
    description: 'Возвращает информацию по одной конкретной попугаю из системы.',
  })
  @ApiResponse({ status: 200, description: 'Информация про попугай.',  })
  @ApiResponse({ status: 404, description: 'Попугай не найден.' })
  findOne(@Param('id', ParseIntPipe) id: number): Parrot {
    const record = this.parrotsService.findOne(id)
  
    if (!record) {
      throw new HttpException('Попугай не найден', HttpStatus.NOT_FOUND)
    }
  
    return record;
  }

  // задекорировать api-спецификацию (1 балл) victory
  // валидировать id и тело запроса, добавить возвращаемый тип (1 балл) victory
  // в случае отсутствия записи выбрасывать верное исключение (1 балл) victory
  @Patch(':id')
  @ApiBody({
    type: UpdateParrotDto,
    description: 'Данные для изменения информации о попугае',
  })
  @ApiOperation({
    summary: 'Изменить информацию по одной конкретной попугае.',
    description: 'Изменяет информацию по одной конкретной попугае из системы.',
  })
  @ApiResponse({ status: 200, description: 'изменение выполнены.',  })
  @ApiResponse({ status: 404, description: 'Попугай не найден.' })
  update(
  @Param('id', ParseIntPipe) id: number,
  @Body({ schema: UpdateProotSchema, pipes: [StandardSchemaValidationPipe] })
    updateParrotDto: UpdateParrotDto,
  ): Parrot {
    const updatedParrot = this.parrotsService.update(id, updateParrotDto);

    if (!updatedParrot) {
      throw new HttpException('Попугай не найден', HttpStatus.NOT_FOUND)
    }

    return updatedParrot;
  }
}
