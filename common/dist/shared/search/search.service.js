"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchService = void 0;
const common_1 = require("@nestjs/common");
const _ = require("lodash");
const slugify_1 = require("slugify");
const language_enum_1 = require("../../enums/language.enum");
let SearchService = class SearchService {
    addSlug(text) {
        if (_.isEmpty(text))
            return undefined;
        return slugify_1.default(text, { lower: true, locale: language_enum_1.LanguageEnum.Vi });
    }
    searchOnSlugField(text) {
        if (_.isEmpty(text))
            return {};
        return {
            slug: {
                $regex: new RegExp(slugify_1.default(text, { lower: true, locale: language_enum_1.LanguageEnum.Vi }), 'i'),
            },
        };
    }
    searchOnField(field, text) {
        if (_.isEmpty(text))
            return {};
        return {
            [field]: { $regex: new RegExp(text, 'i') },
        };
    }
    searchOnMutipleField(fields, text) {
        if (_.isEmpty(text))
            return {};
        const otherFields = fields.map((field) => this.searchOnField(text, field));
        return {
            $or: [this.searchOnSlugField(text), ...otherFields],
        };
    }
    searchOnList(field, items) {
        if (_.isEmpty(items))
            return {};
        return { [field]: { $in: items } };
    }
};
SearchService = __decorate([
    common_1.Injectable()
], SearchService);
exports.SearchService = SearchService;
//# sourceMappingURL=search.service.js.map