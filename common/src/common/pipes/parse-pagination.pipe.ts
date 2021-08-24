import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

import { IPagination } from '../../interfaces/pagination.interface';

@Injectable()
export class ParsePagination implements PipeTransform {
  transform(value: IPagination) {
    try {
      return {
        ...value,
        page: parseInt(value.page ?? '1', 10),
        limit: parseInt(value.limit ?? '10', 10),
      };
    } catch (error) {
      throw new BadRequestException(
        'Validation failed (page, limit is expected)',
      );
    }
  }
}
