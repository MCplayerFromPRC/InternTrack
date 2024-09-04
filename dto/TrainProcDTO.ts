import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { TrainProc } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";

import { TYPES } from "@/lib/properties";

@injectable()
export class TrainProcDatasource extends BaseCollectionDatasource<TrainProc> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("TrainProc"), cache, options);
  }

  async findOnlyOneByMd5(md5: string) {
    const proc = await this.findManyByKeys({ md5 });
    if (proc.length == 0) {
      throw new Error(`No Process ${md5} found.`);
    } else if (proc.length > 1) {
      throw new Error(
        `Conflict MD5 ${md5} for Processes ${proc.map((p) => p._id)}.`,
      );
    }
    return proc[0];
  }
}
