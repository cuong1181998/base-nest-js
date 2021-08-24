"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const common_1 = require("@nestjs/common");
exports.Authorization = common_1.createParamDecorator((data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.authorization;
});
//# sourceMappingURL=authorization.decorator.js.map