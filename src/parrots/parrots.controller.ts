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
  constructor(private readonly parrotsService: ParrotsService) {}

  @Post()
  create(@Body(ClassValidatorPipe) createParrotDto: CreateParrotDto) {
    return this.parrotsService.create(createParrotDto);
  }

  @Get()
  findAll() {
    return this.parrotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parrotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateParrotDto: UpdateParrotDto) {
    return this.parrotsService.update(+id, updateParrotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parrotsService.remove(+id);
  }
}
