/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { NodeDocument } from "./Document";

export class TrainLog extends NodeDocument {
  config!: string;
  configPath: string;
  tbFolder: string;
  logFolder: string;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    config: string,
    configPath: string,
    tbFolder: string,
    logFolder: string,
  ) {
    super(_key, _id, _rev);
    this.config = config;
    this.configPath = configPath;
    this.tbFolder = tbFolder;
    this.logFolder = logFolder;
  }
}
