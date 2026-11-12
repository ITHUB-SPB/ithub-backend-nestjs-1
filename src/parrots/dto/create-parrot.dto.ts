import { IsString, IsAlpha, IsNotEmpty } from 'class-validator'

export class CreateParrotDto {
    @IsAlpha()
    @IsNotEmpty()
    @IsString({ message: 'Задайте имя' })
    name: string;

    @IsAlpha()
    @IsNotEmpty()
    @IsString({ message: 'Задайте породу' })
    breed: string;
}
