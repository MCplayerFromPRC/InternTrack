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

  async createOne(newDoc: any, options = {}) {
    const ckpt = await this.findManyByKeys({ md5: newDoc.md5 });
    if (ckpt.length > 0) {
      throw new Error(
        `MD5 ${newDoc.md5} for Checkpoint already exist ${ckpt.map((c) => c._id)}.`,
      );
    }
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
    return super.createOne(savingCkpt.saveDocument, options);
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

  async findOnlyOneByPath(path: string) {
    const ckpt = await this.findManyByKeys({ path });
    if (ckpt.length == 0) {
      throw new Error(`No Checkpoint ${path} found.`);
    } else if (ckpt.length > 1) {
      throw new Error(
        `Conflict MD5 ${path} for Checkpoints ${ckpt.map((c) => c._id)}.`,
      );
    }
    return ckpt[0];
  }

  async createOrUpdateOne(newDoc: Partial<Checkpoint>, options = {}) {
    const ckpts = await this.findManyByKeys({ md5: newDoc.md5 });
    if (ckpts.length == 0) {
      return this.createOne(newDoc, options);
    } else if (ckpts.length == 1) {
      newDoc._id = ckpts[0]._id;
      return this.updateOne(newDoc as any, options);
    } else {
      throw new Error(`More than one checkpoints with md5 ${newDoc.md5} found`);
    }
  }
}
