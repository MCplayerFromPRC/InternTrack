import type { KeyValueCache } from "@apollo/utils.keyvaluecache/src";
import { Database, aql } from "arangojs";
import type { EdgeCollection } from "arangojs/collection";
import { injectable } from "inversify";

import { EdgeDocument } from "@/models";
import { BaseCollectionDatasource } from "./BaseDocumentDTO";

@injectable()
export class BaseEdgeCollectionDatasource<
  TData extends EdgeDocument,
> extends BaseCollectionDatasource<TData> {
  constructor(
    db: Database,
    collection: EdgeCollection,
    cache: KeyValueCache,
    options = {},
  ) {
    super(db, collection, cache, options);
  }

  async remove(edge: { _from?: string; _to?: string }) {
    const edges = await this.db.query<TData>(aql`
      FOR edge in ${this.collection.name}
        FILTER ${this.buildAQLCondition(edge)}
        REMOVE edge IN ${this.collection.name}
        RETURN OLD
    `);
    const result = await edges.all();

    if (result.length) {
      result.map((edge) => this.deleteFromCacheById(edge._id));
    } else {
      throw new Error(`Couldn't find edge`);
    }

    return result;
  }
}
