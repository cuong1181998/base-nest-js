"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectUserIdInterceptor = void 0;
const common_1 = require("@nestjs/common");
const http_method_enum_1 = require("../../enums/http-method.enum");
let InjectUserIdInterceptor = class InjectUserIdInterceptor {
    intercept(context, next) {
        var _a, _b;
        const request = context.switchToHttp().getRequest();
        if ([http_method_enum_1.HttpMethodEnum.Post, http_method_enum_1.HttpMethodEnum.Put, http_method_enum_1.HttpMethodEnum.Patch].includes(request.method)) {
            request.body.userId = (_a = request.user) === null || _a === void 0 ? void 0 : _a.userId;
        }
        else if (http_method_enum_1.HttpMethodEnum.Get) {
            request.query.userId = (_b = request.user) === null || _b === void 0 ? void 0 : _b.userId;
        }
        return next.handle();
    }
};
InjectUserIdInterceptor = __decorate([
    common_1.Injectable()
], InjectUserIdInterceptor);
exports.InjectUserIdInterceptor = InjectUserIdInterceptor;
//# sourceMappingURL=inject-user-id.interceptor.js.map