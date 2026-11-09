import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import * as z from 'zod';
import { CatsService } from './cats.service.js';

const createCatSchema = z.object({
  name: z.string().nonempty(),
});

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @ApiQuery({
    name: 'search',
    required: false,
  })
  @Get()
  findAll(@Query('search') search?: string): string[] {
    return this.catsService.findAll(search ?? null);
  }

  @Get(':id')
  findOne(@Param('id') id: number): string {
    const record = this.catsService.findOne(id)

    if (!record) {
      throw new HttpException('Кот не найден', HttpStatus.NOT_FOUND)
    }

    return record;
  }

  @Post()
  create(
    @Body({ schema: createCatSchema })
    createDto: z.infer<typeof createCatSchema>,
  ): string {
    return this.catsService.create(createDto.name);
  }
}
