import {
  KeyValueCache,
  KeyValueCacheSetOptions,
} from "@apollo/utils.keyvaluecache";
import { Database, aql } from "arangojs";
import { DocumentCollection } from "arangojs/collection";
import { EJSON } from "bson";
import DataLoader from "dataloader";

import { NodeDocument } from "@/models";
import { DataSourceOptions } from "./BaseDTO";

// https://github.com/graphql/dataloader#batch-function
const orderDocs =
  <V extends { _id?: string | undefined }>(ids: readonly string[]) =>
  (docs: (V | undefined)[], keyFn?: (source: V) => string) => {
    const keyFnDef =
      keyFn ||
      ((source: V & { _id?: string }) => {
        if (source._id) return source._id;
        throw new Error(
          "Could not find ID for object; if using an alternate key, pass in a key function",
        );
      });

    const checkNotUndefined = (input: V | undefined): input is V => {
      return Boolean(input);
    };

    const idMap: Record<string, V> = docs
      .filter(checkNotUndefined)
      .reduce((prev: Record<string, V>, cur: V) => {
        prev[keyFnDef(cur)] = cur;
        return prev;
      }, {});
    return ids.map((id) => idMap[id]);
  };

export interface createCatchingMethodArgs {
  database: Database;
  collection: DocumentCollection;
  cache: KeyValueCache;
  options: DataSourceOptions;
}

export interface CachedMethods<DType> {
  findOneById: (
    id: string,
    args?: KeyValueCacheSetOptions,
  ) => Promise<DType | undefined>;
  findManyByIds: (
    ids: string[],
    args?: KeyValueCacheSetOptions,
  ) => Promise<(DType | undefined)[]>;
  deleteFromCacheById: (id: string) => Promise<void>;
  dataLoader?: DataLoader<string, DType, string>;
  primeLoader: (item: DType | DType[], ttl?: number | null) => void;
}

export const createCachingMethods = <DType extends NodeDocument>({
  database,
  collection,
  cache,
  options,
}: createCatchingMethodArgs): CachedMethods<DType> => {
  const loader = new DataLoader<string, DType>(
    async (ids: readonly string[]) => {
      options?.logger?.debug(
        `ArangoDataSource/DataLoader: loading for IDs: ${ids}`,
      );
      const valid_ids = ids.filter((id) =>
        id.startsWith(`${collection.name}/`),
      );
      const query = aql`RETURN DOCUMENT(${valid_ids})`;
      const cursor = await database.query<DType>(query);
      const results = await cursor.all();

      options?.logger?.debug(
        `ArangoDataSource/DataLoader: response count: ${results.length}`,
      );
      return orderDocs<DType>(ids)(results);
    },
  );

  const cachePrefix = `InternTrack-`;

  const methods: CachedMethods<DType> = {
    findOneById: async (id, { ttl } = {}) => {
      options?.logger?.debug(`ArangoDataSource: Running query for ID ${id}`);
      const key = cachePrefix + id;

      const cacheDoc = await cache.get(key);
      if (cacheDoc) {
        return EJSON.parse(cacheDoc) as DType;
      }

      const doc = await loader.load(id);

      if (Number.isInteger(ttl)) {
        cache.set(key, EJSON.stringify(doc), { ttl });
      }

      return doc;
    },

    findManyByIds: (ids, args = {}) => {
      options?.logger?.debug(`ArangoDataSource: Running query for IDs ${ids}`);
      return Promise.all(ids.map((id) => methods.findOneById(id, args)));
    },

    deleteFromCacheById: async (id) => {
      loader.clear(id);
      await cache.delete(cachePrefix + id);
    },
    /**
     * Loads an item or items into DataLoader and optionally the cache (if TTL is specified)
     * Use this when running a query outside of the findOneById/findManyByIds methods
     * that automatically and transparently do this
     */
    primeLoader: async (docs, ttl?: number | null) => {
      docs = Array.isArray(docs) ? docs : [docs];
      for (const doc of docs) {
        loader.prime(doc._id, doc);
        const key = cachePrefix + doc._id;
        if (ttl || (await cache.get(key))) {
          cache.set(key, EJSON.stringify(doc), { ttl });
        }
      }
    },
    dataLoader: loader,
  };

  return methods;
};
