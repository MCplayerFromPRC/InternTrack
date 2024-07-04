import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { EvalResult } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties"

@injectable()
export class EvalResultDatasource extends BaseCollectionDatasource<EvalResult> {
  constructor(
    @inject(Database)db: Database,
    @inject(TYPES.KeyValueCache)cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions)options: DataSourceOptions = {},
  ) {
    super(db, db.collection("EvalResult"), cache, options);
  }
}
