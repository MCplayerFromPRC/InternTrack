import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { TrainTask, TrainConfig, Checkpoint } from "@/models";
import { BaseViewDatasource } from "./BaseDatasource/BaseViewDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class RetrievalViewDatasource extends BaseViewDatasource<
  Partial<TrainTask & TrainConfig & Checkpoint>
> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.view("RetrievalView"), options);
  }
}
