import { ExecutionContext, Injectable, type CanActivate } from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const header = request.headers.authorization;

    if (request.user || (header && /^Bearer\s+(.+)$/i.test(header))) {
      return true;
    }


    return false;
  }
}
