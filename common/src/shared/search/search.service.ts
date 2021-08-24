import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import slugify from 'slugify';

import { LanguageEnum } from '../../enums/language.enum';
@Injectable()
export class SearchService {
  addSlug(text: string) {
    if (_.isEmpty(text)) return undefined;
    return slugify(text, { lower: true, locale: LanguageEnum.Vi });
  }

  searchOnSlugField(text: string) {
    if (_.isEmpty(text)) return {};

    return {
      slug: {
        $regex: new RegExp(
          slugify(text, { lower: true, locale: LanguageEnum.Vi }),
          'i',
        ),
      },
    };
  }

  searchOnField(field: string, text: string) {
    if (_.isEmpty(text)) return {};
    return {
      [field]: { $regex: new RegExp(text, 'i') },
    };
  }

  searchOnMutipleField(fields: string[], text: string) {
    if (_.isEmpty(text)) return {};

    const otherFields = fields.map((field) => this.searchOnField(text, field));

    // Default behavior search on slug field
    return {
      $or: [this.searchOnSlugField(text), ...otherFields],
    };
  }

  searchOnList(field: string, items: any[]) {
    if (_.isEmpty(items)) return {};

    return { [field]: { $in: items } };
  }
}
