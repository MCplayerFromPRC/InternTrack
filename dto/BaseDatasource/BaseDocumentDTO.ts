/*
## quote:
1. https://github.com/andrejpk/apollo-datasource-cosmosdb/tree/main
*/
import {
  InMemoryLRUCache,
  KeyValueCacheSetOptions,
} from "@apollo/utils.keyvaluecache";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import type { DocumentCollection } from "arangojs/collection";
import { GraphQLError } from "graphql/error";
import { injectable } from "inversify";

import { NodeDocument } from "@/models";
import { BaseDatasource, QueryObject } from "./BaseDTO";
import type { DataSourceOptions } from "./BaseDTO";
import { CachedMethods, createCachingMethods } from "./cache";

const placeholderHandler = () => {
  throw new Error("DataSource not initialized");
};

@injectable()
export class BaseCollectionDatasource<TData extends NodeDocument>
  extends BaseDatasource
  implements CachedMethods<TData>
{
  collection: DocumentCollection;
  // these get set by the initializer but they must be defined or nullable after the constructor
  // runs, so we guard against using them before init
  findOneById: CachedMethods<TData>["findOneById"] = placeholderHandler;
  findManyByIds: CachedMethods<TData>["findManyByIds"] = placeholderHandler;
  deleteFromCacheById: CachedMethods<TData>["deleteFromCacheById"] =
    placeholderHandler;
  dataLoader: CachedMethods<TData>["dataLoader"];
  primeLoader: CachedMethods<TData>["primeLoader"] = placeholderHandler;

  constructor(
    db: Database,
    collection: DocumentCollection,
    cache: KeyValueCache,
    options: DataSourceOptions = {},
  ) {
    super(db, options);
    this.collection = collection;

    if (!this.collection.exists().then((result) => result)) {
      throw new GraphQLError(
        `${this.collection.name} collection does not exist in ${this.db.name} database`,
      );
    }

    const methods = createCachingMethods<TData>({
      database: this.db,
      collection: this.collection,
      cache: cache || new InMemoryLRUCache(),
      options: this.options,
    });
    Object.assign(this, methods);
  }

  async findAll() {
    return this.executeQuery<TData>(
      `FOR doc IN ${this.collection.name} RETURN doc`,
    );
  }

  async findManyByKeys(
    userObject: QueryObject,
    sortKey?: string,
    limit?: number,
  ) {
    const condition = this.buildAQLCondition(userObject);
    const sort_expression = sortKey ? `SORT doc.${sortKey}\n  ` : "";
    const limit_expression = limit! > 0 ? `LIMIT ${limit}\n  ` : "";
    return this.executeQuery<TData>(
      `FOR doc IN ${this.collection.name}\n  FILTER ${condition}\n  ${sort_expression}${limit_expression}RETURN doc`,
    );
  }

  async createOne(
    newDoc: Partial<TData>,
    options: KeyValueCacheSetOptions = {},
  ) {
    const { new: document } =
      (await this.collection.save(newDoc, {
        returnNew: true,
      })) ?? {};

    if (document) {
      this.primeLoader(document, options.ttl);
    }
    return document;
  }

  async deleteOne(id: string) {
    this.options?.logger?.info(
      `BaseCollectionDatasource/deleteOne: deleting id: '${id}'`,
    );
    const { old: document } = await this.collection.remove(id, {
      returnOld: true,
    });

    await this.deleteFromCacheById(id);
    return document;
  }

  async updateOne(
    updDoc: TData,
    { ttl }: KeyValueCacheSetOptions,
    keepNull = false,
    mergeObjects = false,
  ) {
    const results = await this.collection.update(updDoc._id, updDoc, {
      keepNull,
      mergeObjects,
      returnNew: true,
      returnOld: true,
    });

    if (results.new) {
      await this.deleteFromCacheById(results.old._id);
      this.primeLoader(results.new, ttl);
      return results.new;
    } else {
      return null;
    }
  }

  async replaceOne(
    id: string,
    replaceDoc: Partial<TData>,
    { ttl }: KeyValueCacheSetOptions,
  ) {
    const results = await this.collection.replace(id, replaceDoc, {
      returnNew: true,
      returnOld: true,
    });

    if (results.new) {
      await this.deleteFromCacheById(results.old._id);
      this.primeLoader(results.new, ttl);
      return results.new;
    } else {
      return null;
    }
  }
}
