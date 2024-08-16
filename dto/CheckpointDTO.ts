import { Database } from "arangojs";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { injectable, inject } from "inversify";

import { Checkpoint } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class CheckpointDatasource extends BaseCollectionDatasource<Checkpoint> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("Checkpoint"), cache, options);
  }

  async findManyByConfig(config_id: string): Promise<Checkpoint[]> {
    const query = `FOR doc IN ${this.collection} FILTER doc.config == ${config_id} RETURN doc`;
    return this.executeQuery<Checkpoint>(query);
  }
}
