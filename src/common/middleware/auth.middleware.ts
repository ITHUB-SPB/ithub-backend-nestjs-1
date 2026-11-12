import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {    
    use(request: Request, _response: Response, next: NextFunction) {
        const header = request.headers.authorization
        
        if (!header || !header.match(/^Bearer\s+(.+)$/i)) {
            throw new UnauthorizedException();
        }

        next();
    }
}
