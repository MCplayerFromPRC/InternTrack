import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";

import { TrainLog } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import { DataSourceOptions } from "./BaseDatasource/BaseDTO";

export class TrainLogDatasource extends BaseCollectionDatasource<TrainLog> {
  constructor(
    db: Database,
    cache: KeyValueCache,
    options: DataSourceOptions = {},
  ) {
    super(db, db.collection("TrainLog"), cache, options);
  }
}
