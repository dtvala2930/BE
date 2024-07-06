"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryDataAndMeta = void 0;
class QueryDataAndMeta {
    constructor(paginationResults) {
        this.data = paginationResults.data;
        this.metaData = {
            ...paginationResults.queryParams,
            total: paginationResults.total,
        };
    }
}
exports.QueryDataAndMeta = QueryDataAndMeta;
//# sourceMappingURL=query-data-and-meta.js.map