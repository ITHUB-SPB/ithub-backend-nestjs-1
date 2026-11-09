import type { Request, Response, NextFunction } from 'express';

export function timingMiddleware(
    _request: Request,
    response: Response,
    next: NextFunction,
) {
    console.time('processing duration')
    response.once('finish', () => {
        console.timeEnd('processing duration')
    })
    next()
}
