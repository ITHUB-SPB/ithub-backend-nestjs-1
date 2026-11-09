import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware<Request, Response> {
  use(request: Request, _response: Response, next: NextFunction) {
    console.log({
      path: request.path,
      params: request.params,
      body: request.body ?? null,
    });
    next();
  }
}
