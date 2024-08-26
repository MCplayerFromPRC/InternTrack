/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { NodeDocument } from "./Document";

export class Checkpoint extends NodeDocument {
  md5!: string;
  config!: string;
  step: number;
  path: string;
  isSnapshot: boolean;
  isDelivery: boolean;
  isRewardModel: boolean;
  saveTime: Date;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    md5: string,
    config: string,
    step: number,
    path: string,
    saveTime: Date,
    isSnapshot: boolean = false,
    isDelivery: boolean = false,
    isRewardModel: boolean = false,
  ) {
    super(_key, _id, _rev);
    this.md5 = md5;
    this.config = config;
    this.step = step;
    this.path = path;
    this.isSnapshot = isSnapshot;
    this.isDelivery = isDelivery;
    this.isRewardModel = isRewardModel;
    this.saveTime = saveTime;
  }
}
