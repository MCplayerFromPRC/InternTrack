import moment from "moment";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { CkptStep, Checkpoint } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class CkptStepDatasource extends BaseCollectionDatasource<CkptStep> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("CkptStep"), cache, options);
  }

  async createStepByCkpts(
    last: Partial<Checkpoint & { tokens: number }>,
    next: Partial<Checkpoint & { tokens: number }>,
    save: boolean = true,
  ) {
    const step = {
      _from: last._id,
      _to: next._id,
      steps: last.step && next.step ? next.step - last.step : undefined,
      tokens:
        last.tokens && next.tokens ? next.tokens - last.tokens : undefined,
      duration:
        last.saveTime && next.saveTime
          ? moment.duration(moment(next.saveTime).diff(moment(last.saveTime)))
          : undefined,
    };
    if (save) {
      return this.createOrUpdateOne(step);
    } else {
      return step;
    }
  }
}
