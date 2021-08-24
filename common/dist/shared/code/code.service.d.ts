import { HttpService } from '@nestjs/axios';
export declare class CodeService {
    private httpService;
    constructor(httpService: HttpService);
    generateCode(prefix: string, authorization: any): Promise<string>;
}
