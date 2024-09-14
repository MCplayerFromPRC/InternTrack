import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { TrainLog } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class TrainLogDatasource extends BaseCollectionDatasource<TrainLog> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("TrainLog"), cache, options);
  }

  async createOne(newDoc: any, options = {}) {
    if (
      "configPath" in newDoc ||
      "tbFolder" in newDoc ||
      "logFolder" in newDoc
    ) {
      const savingLog = {
        config: newDoc.config,
        configPath: newDoc.configPath,
        tbFolder: newDoc.tbFolder,
        logFolder: newDoc.logFolder,
      };
      return super.createOne(savingLog, options);
    }
    return {};
  }

  async createOrUpdateOne(newDoc: Partial<TrainLog>, options = {}) {
    const logs = await this.findManyByKeys({ config: newDoc.config });
    if (logs.length == 0) {
      return this.createOne(newDoc, options);
    } else if (logs.length == 1) {
      newDoc._id = logs[0]._id;
      return this.updateOne(newDoc as any, options);
    } else {
      throw new Error(`More than one logs with config ${newDoc.config} found`);
    }
  }
}
