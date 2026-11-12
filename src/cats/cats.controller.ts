import { Body, Controller, Get, HttpException, HttpStatus, Param, DefaultValuePipe, ParseIntPipe, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import * as z from 'zod';
import { ZodExceptionFilter } from '../common/filters/zod-exception.filter.js';
import { CatsService } from './cats.service.js';
import { ZodPipe } from '../common/pipes/zod.pipe.js';
import { AuthGuard } from '../common/guards/auth.guard.js';

const createCatSchema = z.object({
  name: z.string().nonempty(),
});

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) { }

  @ApiQuery({
    name: 'search',
    required: false,
    default: null
  })
  @Get()
  findAll(@Query('search', new DefaultValuePipe(null)) search: string): string[] {
    return this.catsService.findAll(search);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): string {
    const record = this.catsService.findOne(id)

    if (!record) {
      throw new HttpException('Кот не найден', HttpStatus.NOT_FOUND)
    }

    return record;
  }

  @Post()
  @UseFilters(ZodExceptionFilter)
  create(
    @Body({ schema: createCatSchema, pipes: [ZodPipe] },)
    createDto: z.infer<typeof createCatSchema>,
  ): string {
    return this.catsService.create(createDto.name);
  }
}
