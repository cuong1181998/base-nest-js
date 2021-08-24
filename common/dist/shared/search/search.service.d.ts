export declare class SearchService {
    addSlug(text: string): string;
    searchOnSlugField(text: string): {
        slug?: undefined;
    } | {
        slug: {
            $regex: RegExp;
        };
    };
    searchOnField(field: string, text: string): {
        [x: string]: {
            $regex: RegExp;
        };
    };
    searchOnMutipleField(fields: string[], text: string): {
        $or?: undefined;
    } | {
        $or: {
            [x: string]: {
                $regex: RegExp;
            };
        }[];
    };
    searchOnList(field: string, items: any[]): {
        [x: string]: {
            $in: any[];
        };
    };
}
