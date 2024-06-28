import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";

import { EdgeDocument } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import { DataSourceOptions } from "./BaseDatasource/BaseDTO";

export class CkptEvalDatasource extends BaseCollectionDatasource<EdgeDocument> {
  constructor(
    db: Database,
    cache: KeyValueCache,
    options: DataSourceOptions = {},
  ) {
    super(db, db.collection("CkptEval"), cache, options);
  }
}
