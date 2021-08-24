import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { SCP_API_ENDPOINT } from '../../environments';
import { GenerateCodeException } from '../../exceptions/generate-code.exception';
import { ICode } from '../../interfaces/code.interface';

@Injectable()
export class CodeService {
  constructor(private httpService: HttpService) {}

  async generateCode(prefix: string, authorization): Promise<string> {
    try {
      const source$ = this.httpService.post(
        `${SCP_API_ENDPOINT}/scp/code-generator`,
        { prefix },
        {
          headers: {
            Authorization: authorization,
          },
        },
      );

      const response = await lastValueFrom(source$);
      const codeData: ICode = response.data.data;

      return `${codeData.prefix}${codeData.counter}`;
    } catch (error) {
      throw new GenerateCodeException();
    }
  }
}
