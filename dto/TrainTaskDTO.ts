import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { TrainTask } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";
import { validateEnum } from "@/lib/utils";

@injectable()
export class TrainTaskDatasource extends BaseCollectionDatasource<TrainTask> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("TrainTask"), cache, options);
  }

  async findOneByName(name: string): Promise<TrainTask> {
    const query = `FOR doc IN ${this.collection} FILTER doc.name == ${name} RETURN doc`;
    const cursor = await this.db.query<TrainTask>(query);
    const count = cursor.count;
    if (count == 1) {
      const result = await cursor.next();
      if (result !== undefined) {
        return result;
      }
    } else if (count == 0) {
      throw new Error(`Task name ${name} not found`);
    } else {
      throw new Error(
        `${cursor.all().then((items) => items.map((item) => item._id))} has same task name ${name}`,
      );
    }
    return {} as TrainTask;
  }

  ModelTypeEnum: { [K in TrainTask["type"] | "default"]: TrainTask["type"] } = {
    pretrain: "pretrain",
    sft: "sft",
    rlhf_rm: "rlhf_rm",
    rlhf_ppo: "rlhf_ppo",
    default: "pretrain",
  };

  createOne(newDoc: any) {
    const savingTask = {
      name: newDoc.name,
      type: validateEnum(newDoc.type, this.ModelTypeEnum),
      desc: newDoc.desc,
    };
    return super.createOne(savingTask);
  }
}
