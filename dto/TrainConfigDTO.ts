import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { TrainConfig } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class TrainConfigDatasource extends BaseCollectionDatasource<TrainConfig> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("TrainConfig"), cache, options);
  }

  async findManyByTask(task_id: string): Promise<TrainConfig[]> {
    // const query = `FOR doc IN ${this.collection} FILTER doc.task == ${task_id} RETURN doc`;
    return this.findManyByKeys({ task: task_id });
  }

  async findOneByCkptId(ckpt_id: string): Promise<TrainConfig> {
    const query = `FOR ckpt IN Checkpoint FILTER ckpt._id == ${ckpt_id} FOR doc IN ${this.collection} FILTER doc._id == ckpt.config RETURN doc`;
    const cursor = await this.db.query<TrainConfig>(query);
    const count = cursor.count;
    if (count == 1) {
      const result = await cursor.next();
      if (result !== undefined) {
        return result;
      }
    } else if (count == 0) {
      throw new Error(`The config of checkpoint ${ckpt_id} not found`);
    } else {
      throw new Error(
        `Checkpoint ${ckpt_id} has multiple configs ${cursor.all().then((items) => items.map((item) => item._id))}`,
      );
    }
    return {} as TrainConfig;
  }

  createOne(newDoc: any, options = {}) {
    const savingTask = {
      task: newDoc.task,
      configContent: newDoc.configContent,
      startStep: newDoc.startStep || 0,
      startToken: newDoc.startToken || 0,
      modelConfig: newDoc.modelConfig,
      dataConfig: newDoc.dataConfig,
      optimizerConfig: newDoc.optimizerConfig,
      parallelConfig: newDoc.parallelConfig,
    };
    return super.createOne(savingTask, options);
  }
}
