import { PipeTransform } from '@nestjs/common';
import { IPagination } from '../../interfaces/pagination.interface';
export declare class ParsePagination implements PipeTransform {
    transform(value: IPagination): {
        page: number;
        limit: number;
    };
}
