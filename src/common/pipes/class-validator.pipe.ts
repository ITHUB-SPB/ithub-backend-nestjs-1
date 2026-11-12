import { HttpException, HttpStatus, Injectable, type ArgumentMetadata, type PipeTransform } from '@nestjs/common'

import { validate } from 'class-validator'
import { plainToInstance } from 'class-transformer'


@Injectable()
export class ClassValidatorPipe implements PipeTransform {
    async transform(value: unknown, metadata: ArgumentMetadata) {
        console.log(value, metadata)
        const types: Function[] = [String, Number, Boolean, Array, Object]

        if (!metadata.metatype) {
            return value
        }

        if (types.includes(metadata.metatype)) {
            return value
        }

        const object = plainToInstance(metadata.metatype, value)
        const errors = await validate(object)

        console.log(object, errors)

        if (errors.length) {
            throw new HttpException(
                'Некорректный формат данных',
                HttpStatus.UNPROCESSABLE_ENTITY,
                { cause: errors }
            )
        }

        return value
    }
}