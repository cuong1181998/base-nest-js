import { HttpException, HttpStatus } from '@nestjs/common';

export class GenerateCodeException extends HttpException {
  constructor() {
    super(`Generate code failer!`, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
