/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { EdgeDocument, NodeDocument } from "./Document";

export class TrainConfig extends NodeDocument {
  task!: string;
  configContent: string;
  startStep: number;
  startToken: number;
  modelConfig: Record<string, any>;
  dataConfig: Record<string, any>;
  optimizerConfig: Record<string, any>;
  parallelConfig: Record<string, any>;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    task: string,
    configContent: string,
    startStep: number = 0,
    startToken: number = 0,
    modelConfig: Record<string, any> = {},
    dataConfig: Record<string, any> = {},
    optimizerConfig: Record<string, any> = {},
    parallelConfig: Record<string, any> = {},
  ) {
    super(_key, _id, _rev);
    this.task = task;
    this.configContent = configContent;
    this.startStep = startStep;
    this.startToken = startToken;
    this.modelConfig = modelConfig;
    this.dataConfig = dataConfig;
    this.optimizerConfig = optimizerConfig;
    this.parallelConfig = parallelConfig;
  }
}

// [(Checkpoint -> TrainConfig), (Checkpoint -> TrainTask), (TrainTask -> TrainConfig)]
export class ResumeCkpt extends EdgeDocument {
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
