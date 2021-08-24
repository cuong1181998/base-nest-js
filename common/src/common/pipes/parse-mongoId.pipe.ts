import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import * as mongoose from 'mongoose';

@Injectable()
export class ParseMongoId implements PipeTransform {
  transform(value: string) {
    try {
      return mongoose.Types.ObjectId(value);
    } catch (error) {
      throw new BadRequestException(
        'Validation failed (mongoId string is expected)',
      );
    }
  }
}
