import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { TrainProc } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";

@injectable()
export class TrainProcDatasource extends BaseCollectionDatasource<TrainProc> {
  constructor(
    @inject("db") db: Database,
    @inject("cache") cache: KeyValueCache,
    @inject("dataSourceOption") options: DataSourceOptions = {},
  ) {
    super(db, db.collection("TrainProc"), cache, options);
  }
}