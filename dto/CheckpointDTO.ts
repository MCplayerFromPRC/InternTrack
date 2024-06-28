import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";

import { Checkpoint } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import { DataSourceOptions } from "./BaseDatasource/BaseDTO";

export class CheckpointDatasource extends BaseCollectionDatasource<Checkpoint> {
  constructor(
    db: Database,
    cache: KeyValueCache,
    options: DataSourceOptions = {},
  ) {
    super(db, db.collection("Checkpoint"), cache, options);
  }

  async findManyByConfig(config_id: string): Promise<Checkpoint[]> {
    const query = `FOR doc IN ${this.collection} FILTER doc.config == ${config_id} RETURN doc`;
    return this.executeQuery<Checkpoint>(query);
  }
}
