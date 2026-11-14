import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseIntPipe,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

import { ParrotsService } from './parrots.service.js';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { Parrot } from './entities/parrot.entity.js';
import { ClassValidatorPipe } from '../common/pipes/class-validator.pipe.js';
import { ClassValidatorExceptionFilter } from '../common/filters/class-validator-exception.filter.js';

@Controller('parrots')
@UseFilters(ClassValidatorExceptionFilter)
export class ParrotsController {
  constructor(private readonly parrotsService: ParrotsService) {}

  @ApiOperation({ summary: 'Добавить попугая' })
  @ApiCreatedResponse({ type: Parrot })
  @ApiUnprocessableEntityResponse({
    description: 'Некорректные данные',
  })
  @Post()
  create(
    @Body(ClassValidatorPipe) createParrotDto: CreateParrotDto,
  ): Parrot {
    return this.parrotsService.create(createParrotDto);
  }

  @ApiOperation({ summary: 'Получить всех попугаев' })
  @ApiOkResponse({ type: Parrot, isArray: true })
  @Get()
  findAll(): Parrot[] {
    return this.parrotsService.findAll();
  }

  @ApiOperation({ summary: 'Получить попугая по ID' })
  @ApiOkResponse({ type: Parrot })
  @ApiNotFoundResponse({ description: 'Попугай не найден' })
  @ApiBadRequestResponse({ description: 'Некорректный ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Parrot {
    const parrot = this.parrotsService.findOne(id);

    if (!parrot) {
      throw new NotFoundException('Попугай не найден');
    }

    return parrot;
  }

  @ApiOperation({ summary: 'Обновить попугая' })
  @ApiOkResponse({ type: Parrot })
  @ApiNotFoundResponse({ description: 'Попугай не найден' })
  @ApiBadRequestResponse({ description: 'Некорректный ID' })
  @ApiUnprocessableEntityResponse({
    description: 'Некорректные данные',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ClassValidatorPipe) updateParrotDto: UpdateParrotDto,
  ): Parrot {
    const parrot = this.parrotsService.update(id, updateParrotDto);

    if (!parrot) {
      throw new NotFoundException('Попугай не найден');
    }

    return parrot;
  }
}
