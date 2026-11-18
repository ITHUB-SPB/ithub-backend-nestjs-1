
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
  ApiResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { ParrotsService } from './parrots.service.js';
import { CreateParrotDto } from './dto/create-parrot.dto.js';
import { UpdateParrotDto } from './dto/update-parrot.dto.js';
import { Parrot } from './entities/parrot.entity.js';

import { ClassValidatorPipe } from '../common/pipes/class-validator.pipe.js';

@Controller('parrots')
export class ParrotsController {
  constructor(private readonly parrotsService: ParrotsService) {}

  @ApiOperation({ summary: 'Создать попугая' })
  @ApiBody({ type: CreateParrotDto })
  @ApiCreatedResponse({
    description: 'Попугай успешно создан',
    type: Parrot,
  })
  @Post()
  create(
    @Body(ClassValidatorPipe) createParrotDto: CreateParrotDto,
  ): Parrot {
    return this.parrotsService.create(createParrotDto);
  }

  @ApiOperation({ summary: 'Получить список попугаев' })
  @ApiResponse({
    status: 200,
    description: 'Список попугаев',
    type: [Parrot],
  })
  @Get()
  findAll(): Parrot[] {
    return this.parrotsService.findAll();
  }

  @ApiOperation({ summary: 'Получить попугая по ID' })
  @ApiParam({
    name: 'id',
    description: 'ID попугая',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Попугай найден',
    type: Parrot,
  })
  @ApiNotFoundResponse({
    description: 'Попугай не найден',
  })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Parrot {
    const parrot = this.parrotsService.findOne(id);

    if (!parrot) {
      throw new NotFoundException('Попугай не найден');
    }

    return parrot;
  }

  @ApiOperation({ summary: 'Обновить попугая' })
  @ApiParam({
    name: 'id',
    description: 'ID попугая',
    example: 1,
  })
  @ApiBody({ type: UpdateParrotDto })
  @ApiResponse({
    status: 200,
    description: 'Попугай обновлен',
    type: Parrot,
  })
  @ApiNotFoundResponse({
    description: 'Попугай не найден',
  })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body(ClassValidatorPipe) updateParrotDto: UpdateParrotDto,
  ): Parrot {
    const parrot = this.parrotsService.update(
      id,
      updateParrotDto,
    );

    if (!parrot) {
      throw new NotFoundException('Попугай не найден');
    }

    return parrot;
  }
}
