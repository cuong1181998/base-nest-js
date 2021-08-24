import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { IResponse } from '../../interfaces/response.interface';
export declare class TransformInterceptor<T> implements NestInterceptor<T, IResponse<T>> {
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<IResponse<T>>;
}
