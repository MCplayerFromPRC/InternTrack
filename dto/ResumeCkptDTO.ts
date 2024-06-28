import { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";

import { ResumeCkpt } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import { DataSourceOptions } from "./BaseDatasource/BaseDTO";
export class ResumeCkptDatasource extends BaseCollectionDatasource<ResumeCkpt> {
  constructor(
    db: Database,
    cache: KeyValueCache,
    options: DataSourceOptions = {},
  ) {
    super(db, db.collection("ResumeCkpt"), cache, options);
  }
}
