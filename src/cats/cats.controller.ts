import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import * as z from 'zod'

const cats = ['musya', 'dusya']

const createCatSchema = z.object({
    name: z.string().nonempty()
})

@Controller('cats')
export class CatsController {
    @Get()
    findAll(@Query('search') search: string) {
        return cats.filter(name => name.includes(search))
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return cats[id]
    }

    @Post()
    create(@Body({ schema: createCatSchema }) createDto: z.infer<typeof createCatSchema>) {
        cats.push(createDto.name)
        return cats.at(-1)
    }
}