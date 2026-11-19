import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  ParseIntPipe,
} from '@nestjs/common';
import { ParrotsService } from './parrots.service.js';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { ClassValidatorPipe } from '../common/pipes/class-validator.pipe.js';
import {
  ApiCreatedResponse,
  ApiConflictResponse,
  ApiUnprocessableEntityResponse,
  ApiOperation,
  ApiBody,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';
import { Parrot } from './entities/parrot.entity.js';

@Controller('parrots')
export class ParrotsController {
  constructor(private readonly parrotsService: ParrotsService) {}

  // задекорировать api-спецификацию, дописать возвращаемый тип (1 балл);
  //
  // реализовать фильтр для обработки исключений, выбрасываемых пайпом
  // `class-validator.pipe.ts`, по аналогии с фильтром `zod-exception.filter.ts`,
  // для стандартизации формата ответов в случае ошибок валидации (1 балл);
  @ApiOperation({ summary: 'Добавить нового попугая' })
  @ApiUnprocessableEntityResponse({
    description: 'Некорректные входные данные',
  })
  @ApiConflictResponse({ description: 'Запись уже существует' })
  @ApiCreatedResponse({ description: 'Информация о добавленной записи' })
  @Post()
  create(@Body(ClassValidatorPipe) createParrotDto: CreateParrotDto): Parrot {
    return this.parrotsService.create(createParrotDto);
  }

  // задекорировать api-спецификацию, дописать возвращаемый тип  (1 балл)
  @ApiOperation({
    summary: 'попугаев получить',
    description: 'получает попугаев',
  })
  @ApiResponse({
    status: 200,
    description: 'список попугаев есть',
    isArray: true,
  })
  @Get()
  findAll(): Parrot[] {
    return this.parrotsService.findAll();
  }

  // задекорировать api-спецификацию (1 балл)
  // валидировать id, добавить возвращаемый тип (1 балл)
  // в случае отсутствия записи выбрасывать верное исключение (1 балл)
  @ApiOperation({
    summary: 'попугая одну получить',
    description: 'получает попугая по айди',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'айди попугая',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'попугай есть',
  })
  @ApiResponse({ status: 404, description: 'попугай не найден' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Parrot {
    const parrot = this.parrotsService.findOne(id);
    if (!parrot) throw new NotFoundException('попугай не найден');
    return parrot;
  }

  // задекорировать api-спецификацию (1 балл)
  // валидировать id и тело запроса, добавить возвращаемый тип (1 балл)
  // в случае отсутствия записи выбрасывать верное исключение (1 балл)
  @ApiOperation({
    summary: 'менять попугая',
    description: 'меняет попугая по дто схеме',
  })
  @ApiBody({
    type: UpdateParrotDto,
    description: 'обновляет попугая по дто',
  })
  @ApiResponse({
    status: 200,
    description: 'попугай изменена',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ClassValidatorPipe) updateParrotDto: UpdateParrotDto,
  ): Parrot {
    const parrot = this.parrotsService.update(id, updateParrotDto);
    if (!parrot) throw new NotFoundException('попугай не найден');
    return parrot;
  }
}
