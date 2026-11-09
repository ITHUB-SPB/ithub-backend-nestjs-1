import { HttpException, HttpStatus } from "@nestjs/common";

export class ServerException extends HttpException {
    constructor(error: Error) {
        super('Ошибка сервера', HttpStatus.INTERNAL_SERVER_ERROR, {
            cause: error
        })
    }
}