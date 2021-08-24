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
exports.AuthenticateGuard = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const environments_1 = require("../../environments");
let AuthenticateGuard = class AuthenticateGuard {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        try {
            const source$ = this.httpService.get(`${environments_1.SCP_API_ENDPOINT}/scp/check-auth`, {
                headers: {
                    Authorization: request.headers.authorization,
                },
            });
            const response = await rxjs_1.lastValueFrom(source$);
            request.user = response.data.data;
            return true;
        }
        catch (error) {
            throw new common_1.UnauthorizedException();
        }
    }
};
AuthenticateGuard = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AuthenticateGuard);
exports.AuthenticateGuard = AuthenticateGuard;
//# sourceMappingURL=authenticate.guard.js.map