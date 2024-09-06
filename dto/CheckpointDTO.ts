import { Database } from "arangojs";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { injectable, inject } from "inversify";

import { Checkpoint } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class CheckpointDatasource extends BaseCollectionDatasource<Checkpoint> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("Checkpoint"), cache, options);
  }

  async findManyByConfig(config_id: string): Promise<Checkpoint[]> {
    // const query = `FOR doc IN ${this.collection} FILTER doc.config == ${config_id} RETURN doc`;
    // return this.executeQuery<Checkpoint>(query);
    return this.findManyByKeys({ config: config_id });
  }

  createOne(newDoc: any) {
    const savingCkpt = new Checkpoint(
      "_key",
      "_id",
      "_rev",
      newDoc.md5,
      newDoc.config,
      newDoc.step,
      newDoc.path,
      "saveTime" in newDoc ? newDoc.saveTime : new Date(),
      "isSnapshot" in newDoc ? newDoc.isSnapshot : false,
      "isDelivery" in newDoc ? newDoc.isDelivery : false,
      "isRewardModel" in newDoc ? newDoc.isRewardModel : false,
    );
    return super.createOne(savingCkpt.saveDocument);
  }

  async findOnlyOneByMd5(md5: string) {
    const ckpt = await this.findManyByKeys({ md5 });
    if (ckpt.length == 0) {
      throw new Error(`No Checkpoint ${md5} found.`);
    } else if (ckpt.length > 1) {
      throw new Error(
        `Conflict MD5 ${md5} for Checkpoints ${ckpt.map((c) => c._id)}.`,
      );
    }
    return ckpt[0];
  }
}
