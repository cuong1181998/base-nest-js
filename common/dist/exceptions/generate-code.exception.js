"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateCodeException = void 0;
const common_1 = require("@nestjs/common");
class GenerateCodeException extends common_1.HttpException {
    constructor() {
        super(`Generate code failer!`, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
    }
}
exports.GenerateCodeException = GenerateCodeException;
//# sourceMappingURL=generate-code.exception.js.map