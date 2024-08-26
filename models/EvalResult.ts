/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { NodeDocument } from "./Document";

export class EvalResult extends NodeDocument {
  ckpt: string;
  scores: {
    datasetMd5: string;
    datasetName: string;
    subsetName: string;
    score: number;
    metrics: string;
  };
  finishTime: Date;
  logFolder: string;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    ckpt: string,
    scores: {
      datasetMd5: string;
      datasetName: string;
      subsetName: string;
      score: number;
      metrics: string;
    },
    finishTime: Date,
    logFolder: string,
  ) {
    super(_key, _id, _rev);
    this.ckpt = ckpt;
    this.scores = scores;
    this.finishTime = finishTime;
    this.logFolder = logFolder;
  }
}
