/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { EdgeDocument, NodeDocument } from "./Document";

export class TrainConfig extends NodeDocument {
  modelName: string;
  configContent: string;
  startStep: number;
  modelConfig: Record<string, any>;
  dataConfig: Record<string, any>;
  optimizerConfig: Record<string, any>;
  parallelConfig: Record<string, any>;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    modelName: string,
    configContent: string,
    startStep: number = 0,

    modelConfig: Record<string, any> = {},
    dataConfig: Record<string, any> = {},
    optimizerConfig: Record<string, any> = {},
    parallelConfig: Record<string, any> = {},
  ) {
    super(_key, _id, _rev);
    this.modelName = modelName;
    this.configContent = configContent;
    this.startStep = startStep;
    this.modelConfig = modelConfig;
    this.dataConfig = dataConfig;
    this.optimizerConfig = optimizerConfig;
    this.parallelConfig = parallelConfig;
  }
}

// [(Checkpoint -> TrainConfig)]
export class ResumeCkpt extends EdgeDocument {
  isSameTask: boolean;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    _from: string,
    _to: string,
    isSameTask: boolean,
  ) {
    super(_key, _id, _rev, _from, _to);
    this.isSameTask = isSameTask;
  }
}
