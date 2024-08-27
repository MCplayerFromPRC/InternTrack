/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { NodeDocument, EdgeDocument } from "./Document";

export class EvalScore {
  datasetMd5: string;
  datasetName: string;
  subsetName: string;
  metric: string;
  mode: string;
  score: number;

  constructor(
    datasetMd5: string,
    datasetName: string,
    subsetName: string,
    metric: string,
    mode: string,
    score: number,
  ) {
    this.datasetMd5 = datasetMd5;
    this.datasetName = datasetName;
    this.subsetName = subsetName;
    this.metric = metric;
    this.mode = mode;
    this.score = score;
  }
}

export class EvalResult extends NodeDocument {
  ckpt: string;
  scores: EvalScore[];
  finishTime: Date;
  isValid: boolean;
  logFolder?: string;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    ckpt: string,
    scores: EvalScore[],
    finishTime: Date,
    isValid: boolean,
    logFolder?: string,
  ) {
    super(_key, _id, _rev);
    this.ckpt = ckpt;
    this.scores = scores;
    this.finishTime = finishTime;
    this.isValid = isValid;
    this.logFolder = logFolder;
  }
}

export class CkptEval extends EdgeDocument {
  constructor(
    _key: string,
    _id: string,
    _rev: string,
    _from: string,
    _to: string,
  ) {
    super(_key, _id, _rev, _from, _to);
  }
}
