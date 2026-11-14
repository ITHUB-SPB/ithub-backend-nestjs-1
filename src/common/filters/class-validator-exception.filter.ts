
import {
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import type { Response } from 'express';
import type { ValidationError } from 'class-validator';

@Catch(HttpException)
export class ClassValidatorExceptionFilter extends BaseExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const statusCode = exception.getStatus();
    const errors = exception.cause as ValidationError[];

    if (
      statusCode !== HttpStatus.UNPROCESSABLE_ENTITY ||
      !Array.isArray(errors)
    ) {
      return super.catch(exception, host);
    }

    const response = host.switchToHttp().getResponse<Response>();
    const fieldErrors: Record<string, string[]> = {};

    for (const error of errors) {
      fieldErrors[error.property] = Object.values(
        error.constraints || {},
      );
    }

    response.status(statusCode).json({
      statusCode,
      message: {
        formErrors: [],
        fieldErrors,
      },
    });
  }
}
