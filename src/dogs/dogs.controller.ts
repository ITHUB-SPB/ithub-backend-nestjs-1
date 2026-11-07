import { Controller, Get, Post, Body } from '@nestjs/common';
import { CreateDogDto } from './dogs.dto.js';

const dogs = [
    { name: "rex", age: 3 }
]


@Controller('dogs')
export class DogsController {
    @Get()
    findMany() {
        return dogs
    }

    @Post()
    create(@Body() createDogDto: CreateDogDto) {
        dogs.push(createDogDto)
        return dogs.at(-1)
    }
}
