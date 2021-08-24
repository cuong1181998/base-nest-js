import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { HttpMethodEnum } from '../../enums/http-method.enum';

@Injectable()
export class InjectUserIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (
      [HttpMethodEnum.Post, HttpMethodEnum.Put, HttpMethodEnum.Patch].includes(
        request.method,
      )
    ) {
      request.body.userId = request.user?.userId;
    } else if (HttpMethodEnum.Get) {
      request.query.userId = request.user?.userId;
    }
    return next.handle();
  }
}
