import { Catch, ArgumentsHost, HttpStatus, type ExceptionFilter } from '@nestjs/common'
import z, { ZodError } from 'zod'
import type { Response } from 'express'

@Catch(ZodError)
export class ZodExceptionFilter implements ExceptionFilter {
    catch(exception: ZodError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse<Response>()
        const statusCode = HttpStatus.UNPROCESSABLE_ENTITY

        response
            .status(statusCode)
            .json({
                statusCode,
                message: z.flattenError(exception)
            })
    }
}