import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import Papa from "papaparse";
import { injectable, inject } from "inversify";

import { EvalScore, EvalResult } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class EvalResultDatasource extends BaseCollectionDatasource<EvalResult> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("EvalResult"), cache, options);
  }

  async findValidOneByCkpt(ckpt_id: string): Promise<EvalResult | undefined> {
    return (
      await this.findManyByKeys(
        { ckpt: ckpt_id, isValid: true },
        "finishTime",
        1,
      )
    ).shift();
  }

  async findManyByCkpt(
    ckpt_id: string,
    valid: boolean = true,
  ): Promise<EvalResult[]> {
    if (valid) {
      return this.findManyByKeys({ config: ckpt_id, isValid: true });
    } else {
      return this.findManyByKeys({ config: ckpt_id });
    }
  }

  async setInvalidByCkpt(ckpt_id: string) {
    const query = `FOR doc IN ${this.collection.name} FILTER doc.ckpt == "${ckpt_id}" UPDATE doc WITH { isValid: false }`;
    // const query = `UPDATE {ckpt: "${ckpt_id}"} WITH { isValid: false } IN ${this.collection.name}`;
    console.log(query);
    return this.executeQuery(query);
  }
}

export function handleFile(fileBuffer: Buffer): EvalResult {
  const file = fileBuffer.toString("utf-8");
  const result = new EvalResult(
    "_key",
    "_id",
    "_rev",
    "ckptId",
    [],
    new Date(),
    true,
  );

  Papa.parse<Omit<EvalScore, "datasetName">>(file, {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true,
    transformHeader: (header) => {
      switch (header) {
        case "dataset":
          return "subsetName";
        case "version":
          return "datasetMd5";
        case "metric":
          return "metric";
        case "mode":
          return "mode";
        default:
          return "score";
      }
    },
    complete: (results) => {
      for (const data of results.data) {
        const { subsetName, ...others } = data;
        result.scores.push({
          subsetName,
          datasetName: subsetName.split("-")[0],
          ...others,
        });
      }
    },
    error: (error: Error) => {
      throw error;
    },
  });

  return result;
}
