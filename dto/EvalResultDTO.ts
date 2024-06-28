import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";

import { EvalResult } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import { DataSourceOptions } from "./BaseDatasource/BaseDTO";

export class EvalResultDatasource extends BaseCollectionDatasource<EvalResult> {
  constructor(
    db: Database,
    cache: KeyValueCache,
    options: DataSourceOptions = {},
  ) {
    super(db, db.collection("EvalResult"), cache, options);
  }
}
