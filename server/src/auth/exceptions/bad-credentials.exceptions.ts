import { HttpException } from "@nestjs/common";

export class BadCredentialsException extends HttpException {
    constructor() {
        super('Bad Credentials', 401)
    }
}