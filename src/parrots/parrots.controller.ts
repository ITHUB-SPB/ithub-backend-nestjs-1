import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ParrotsService } from './parrots.service.js';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { ClassValidatorPipe } from '../common/pipes/class-validator.pipe.js';

@Controller('parrots')
export class ParrotsController {
  constructor(private readonly parrotsService: ParrotsService) { }

  // задекорировать api-спецификацию, дописать возвращаемый тип (1 балл);
  // 
  // реализовать фильтр для обработки исключений, выбрасываемых пайпом 
  // `class-validator.pipe.ts`, по аналогии с фильтром `zod-exception.filter.ts`, 
  // для стандартизации формата ответов в случае ошибок валидации (1 балл);

  @Post()
  create(@Body(ClassValidatorPipe) createParrotDto: CreateParrotDto) {
    return this.parrotsService.create(createParrotDto);
  }

  // задекорировать api-спецификацию, дописать возвращаемый тип  (1 балл)
  @Get()
  findAll() {
    return this.parrotsService.findAll();
  }

  // задекорировать api-спецификацию (1 балл)
  // валидировать id, добавить возвращаемый тип (1 балл)
  // в случае отсутствия записи выбрасывать верное исключение (1 балл)
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.parrotsService.findOne(+id);
  }

  // задекорировать api-спецификацию (1 балл)
  // валидировать id и тело запроса, добавить возвращаемый тип (1 балл)
  // в случае отсутствия записи выбрасывать верное исключение (1 балл)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParrotDto: UpdateParrotDto) {
    return this.parrotsService.update(+id, updateParrotDto);
  }
}
