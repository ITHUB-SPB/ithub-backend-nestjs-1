import { Injectable, type ArgumentMetadata, type PipeTransform } from '@nestjs/common'
import * as z from 'zod'

@Injectable()
export class ZodPipe implements PipeTransform {
    transform(value: unknown, metadata: ArgumentMetadata) {
        if (!metadata.schema) {
            return value
        }

        if (!(metadata.schema instanceof z.ZodObject)) {
            return value
        }

        return z.parse(metadata.schema, value)
    }
}