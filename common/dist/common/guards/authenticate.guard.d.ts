import { HttpService } from '@nestjs/axios';
import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class AuthenticateGuard implements CanActivate {
    private httpService;
    constructor(httpService: HttpService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
