import { HttpException, HttpStatus } from '@nestjs/common';

export class ResourceNotExistException extends HttpException {
  constructor() {
    super(`Resource doesn't exist`, HttpStatus.BAD_REQUEST);
  }
}
