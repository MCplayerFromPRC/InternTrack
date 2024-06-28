/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { NodeDocument } from "./Document";

export class Checkpoint extends NodeDocument {
  md5!: string;
  config!: string;
  step: number;
  isDelivery: boolean;
  saveTime: Date;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    md5: string,
    config: string,
    step: number,
    isDelivery: boolean,
    saveTime: Date,
  ) {
    super(_key, _id, _rev);
    this.md5 = md5;
    this.step = step;
    this.config = config;
    this.isDelivery = isDelivery;
    this.saveTime = saveTime;
  }
}
