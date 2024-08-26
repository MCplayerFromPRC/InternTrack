import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { EvalScore, EvalResult } from "@/models";
import { BaseCollectionDatasource } from "./BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "./BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class EvalResultDatasource extends BaseCollectionDatasource<EvalResult> {
  constructor(
    @inject(Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("EvalResult"), cache, options);
  }

  async findValidOneByCkpt(ckpt_id: string): Promise<EvalResult | undefined> {
    return (
      await this.findManyByKeys(
        { config: ckpt_id, isValid: true },
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
    // const query = `FOR doc IN ${this.collection} FILTER doc.ckpt == ${ckpt_id} UPDATE doc WITH { isValid: false }`;
    const query = `UPDATE PARSE_IDENTIFIER("${ckpt_id}").key WITH { isValid: false } IN ${this.collection}`;
    return this.executeQuery(query);
  }
}

export function handleFiles(files: FileList | null): EvalResult | undefined {
  if (!files || files.length !== 1) return;
  const file = files[0];
  const result = new EvalResult(
    "_key",
    "_id",
    "_rev",
    "ckptId",
    [],
    new Date(file.lastModified),
    "../../",
    true,
  );
  const reader = new FileReader();

  reader.onload = function (event) {
    const text = event.target?.result;
    result.scores.push(...parseCSV(text as string));
  };

  reader.readAsText(file);
  return result;
}

function parseCSV(csvData: string): EvalScore[] {
  const result: EvalScore[] = [];
  const lines = csvData.split("\n");
  const dataList = lines.map((line) => line.split(","));
  // const headers = dataList[0];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dataList.slice(1).forEach((item, id) => {
    const [datasetName, datasetMd5, metric, mode, score] = item;
    result.push(
      new EvalScore(
        datasetMd5,
        datasetName,
        datasetName.split("-")[0],
        metric,
        mode,
        Number(score),
      ),
    );
  });
  return result;
}
