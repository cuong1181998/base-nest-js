import { PipeTransform } from '@nestjs/common';
import * as mongoose from 'mongoose';
export declare class ParseMongoId implements PipeTransform {
    transform(value: string): mongoose.Types.ObjectId;
}
