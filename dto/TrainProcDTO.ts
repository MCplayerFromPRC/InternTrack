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

  async createOne(newDoc: any, options = {}) {
    const proc = await this.findManyByKeys({ md5: newDoc.md5 });
    if (proc.length > 0) {
      throw new Error(
        `MD5 ${newDoc.md5} for Process already exist ${proc.map((p) => p._id)}.`,
      );
    }
    const savingProc = new TrainProc(
      "_key",
      "_id",
      "_rev",
      newDoc.md5,
      newDoc.config,
      newDoc.cluster,
      newDoc.envVar,
      newDoc.gpuNum,
      newDoc.startTime,
      newDoc.endtime,
      newDoc.currentStep,
      newDoc.totalStep,
      newDoc.state,
    );
    return super.createOne(savingProc.saveDocument, options);
  }

  async findOnlyOneByConfig(config: string) {
    const proc = await this.findManyByKeys({ config });
    if (proc.length == 0) {
      throw new Error(`No Process ${config} found.`);
    } else if (proc.length > 1) {
      throw new Error(
        `Conflict config ${config} for Processes ${proc.map((p) => p._id)}.`,
      );
    }
    return proc[0];
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

  async createOrUpdateOne(newDoc: Partial<TrainProc>, options = {}) {
    const procs = await this.findManyByKeys({ config: newDoc.config });
    if (procs.length == 0) {
      return this.createOne(newDoc, options);
    } else if (procs.length == 1) {
      newDoc._id = procs[0]._id;
      return this.updateOne(newDoc as any, options);
    } else {
      throw new Error(`More than one procs with config ${newDoc.config} found`);
    }
  }
}
