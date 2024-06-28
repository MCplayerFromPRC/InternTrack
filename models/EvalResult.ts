/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { NodeDocument } from "./Document";

export class EvalResult extends NodeDocument {
  datasetMd5: string;
  metrics: string;
  score: number;
  logFolder: string;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    datasetMd5: string,
    metrics: string,
    score: number,
    logFolder: string,
  ) {
    super(_key, _id, _rev);
    this.datasetMd5 = datasetMd5;
    this.metrics = metrics;
    this.score = score;
    this.logFolder = logFolder;
  }
}
