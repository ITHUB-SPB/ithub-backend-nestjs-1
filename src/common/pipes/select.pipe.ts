import { HttpException, HttpStatus, Injectable, type ArgumentMetadata, type PipeTransform } from '@nestjs/common'

export type SelectValue<TValue> = {
    id: number;
    value: TValue;
}

class SelectPipe<TInitial, TResult> implements PipeTransform<TInitial, TResult> {
    transform(value: TInitial, metadata: ArgumentMetadata): TResult {
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
        } as TResult
    }
}

@Injectable()
export class NumericSelectPipe extends SelectPipe<SelectValue<string | number>, SelectValue<number>> {
    transform(value: SelectValue<string | number>, metadata: ArgumentMetadata): SelectValue<number> {
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
export class StringSelectPipe extends SelectPipe<SelectValue<string | number>, SelectValue<string>> {
    transform(value: SelectValue<string | number>, metadata: ArgumentMetadata): SelectValue<string> {
        const valueAfterParentPipe = super.transform(value, metadata)

        if (typeof valueAfterParentPipe.value !== 'string') {
            throw new HttpException(
                'Некорректный формат', HttpStatus.UNPROCESSABLE_ENTITY
            )
        }

        return valueAfterParentPipe
    }
}