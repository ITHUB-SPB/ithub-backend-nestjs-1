import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateDogDto } from './dogs.dto.js';
import { DogsService } from './dogs.service.js';
import { type Dog } from './dogs.interface.js';

@Controller('dogs')
export class DogsController {
    constructor(private readonly dogsService: DogsService) { }

    @Get()
    findMany(): Dog[] {
        return this.dogsService.findAll()
    }

    @Post()
    create(@Body() createDogDto: CreateDogDto): Dog {
        return this.dogsService.create(createDogDto.name, createDogDto.age)
    }
}
