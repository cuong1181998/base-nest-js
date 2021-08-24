import { HttpService } from '@nestjs/axios';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { SCP_API_ENDPOINT } from '../../environments';

@Injectable()
export class AuthenticateGuard implements CanActivate {
  constructor(private httpService: HttpService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    try {
      const source$ = this.httpService.get(
        `${SCP_API_ENDPOINT}/scp/check-auth`,
        {
          headers: {
            Authorization: request.headers.authorization,
          },
        },
      );

      const response = await lastValueFrom(source$);

      request.user = response.data.data;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
