import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(request: Request, _response: Response, next: NextFunction) {
        if (!request.headers.authorization) {
            throw new UnauthorizedException();
        }
        next();
    }
}
