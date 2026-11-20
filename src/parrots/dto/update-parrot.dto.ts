import { IsString, IsAlpha, IsNotEmpty, IsNumber } from 'class-validator'
import { PartialType, ApiProperty } from '@nestjs/swagger';
import { CreateParrotDto } from './create-parrot.dto.js';

export class UpdateParrotDto extends PartialType(CreateParrotDto) {
    @ApiProperty({ description: 'ID попугая', example: 1 })
    @IsNotEmpty()
    @IsNumber()
    id: number;

    @ApiProperty({ description: "Порода попугая", example: "Красный" })
    @IsAlpha()
    @IsNotEmpty()
    @IsString({ message: 'Задайте породу' })
    breed: string;
}
