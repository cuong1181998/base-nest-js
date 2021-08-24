"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParsePagination = void 0;
const common_1 = require("@nestjs/common");
let ParsePagination = class ParsePagination {
    transform(value) {
        var _a, _b;
        try {
            return Object.assign(Object.assign({}, value), { page: parseInt((_a = value.page) !== null && _a !== void 0 ? _a : '1', 10), limit: parseInt((_b = value.limit) !== null && _b !== void 0 ? _b : '10', 10) });
        }
        catch (error) {
            throw new common_1.BadRequestException('Validation failed (page, limit is expected)');
        }
    }
};
ParsePagination = __decorate([
    common_1.Injectable()
], ParsePagination);
exports.ParsePagination = ParsePagination;
//# sourceMappingURL=parse-pagination.pipe.js.map