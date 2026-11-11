import { HttpException, HttpStatus, Injectable, type ArgumentMetadata, type PipeTransform } from '@nestjs/common'

export type SelectValue<TValue> = {
    id: number;
    value: TValue;
}

class SelectPipe implements PipeTransform {
    transform(value: SelectValue<string | number>, metadata: ArgumentMetadata) {
        if (
            !(typeof value === 'object')
            || value === null
            || !("id" in value)
            || !("value" in value)
            || typeof value.id !== 'number' && typeof value.id !== 'string'
            || typeof value.value !== 'number' && typeof value.value !== 'string'
        ) {
            throw new HttpException(
                'Некорректный формат', HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        if (typeof value.id === 'string' && Number.isNaN(Number(value.id))) {
            throw new HttpException(
                'Некорректный формат', HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        return {
            id: Number(value.id),
            value: value.value
        }
    }
}

@Injectable()
export class NumericSelectPipe extends SelectPipe {
    transform(value: SelectValue<number>, metadata: ArgumentMetadata) {
        const valueAfterParentPipe = super.transform(value, metadata)

        if (typeof valueAfterParentPipe.value === 'string' && Number.isNaN(Number(valueAfterParentPipe.value))) {
            throw new HttpException(
                'Некорректный формат', HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        return {
            id: value.id,
            value: Number(value.value)
        }
    }
}

@Injectable()
export class StringSelectPipe extends SelectPipe {
    transform(value: SelectValue<string>, metadata: ArgumentMetadata) {
        const valueAfterParentPipe = super.transform(value, metadata)

        if (typeof valueAfterParentPipe.value !== 'string') {
            throw new HttpException(
                'Некорректный формат', HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        return value
    }
}