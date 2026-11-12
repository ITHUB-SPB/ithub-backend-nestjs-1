import { IsString, IsAlpha, IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger';

export class CreateParrotDto {
    @ApiProperty({ description: "Имя попугая", example: "Попугайка" })
    @IsAlpha()
    @IsNotEmpty()
    @IsString({ message: 'Задайте имя' })
    name: string;

    @ApiProperty({ description: "Порода попугая", example: "Красный" })
    @IsAlpha()
    @IsNotEmpty()
    @IsString({ message: 'Задайте породу' })
    breed: string;
}
