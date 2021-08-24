"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const environments_1 = require("../../environments");
const generate_code_exception_1 = require("../../exceptions/generate-code.exception");
let CodeService = class CodeService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async generateCode(prefix, authorization) {
        try {
            const source$ = this.httpService.post(`${environments_1.SCP_API_ENDPOINT}/scp/code-generator`, { prefix }, {
                headers: {
                    Authorization: authorization,
                },
            });
            const response = await rxjs_1.lastValueFrom(source$);
            const codeData = response.data.data;
            return `${codeData.prefix}${codeData.counter}`;
        }
        catch (error) {
            throw new generate_code_exception_1.GenerateCodeException();
        }
    }
};
CodeService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], CodeService);
exports.CodeService = CodeService;
//# sourceMappingURL=code.service.js.map