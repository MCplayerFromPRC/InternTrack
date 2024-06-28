/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Timestamp } from "bson";
import { NodeDocument } from "./Document";

export class TrainTask extends NodeDocument {
  cluster: string;
  envVar: object;
  config!: string;
  gpuNum: number;
  startTime: Timestamp;
  endtime: Timestamp;
  currentStep: number;
  totalStep: number;
  state: string;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    cluster: string,
    envVar: object,
    config: string,
    gpuNum: number,
    startTime: Timestamp,
    endtime: Timestamp,
    currentStep: number,
    totalStep: number,
    state: string,
  ) {
    super(_key, _id, _rev);
    this.cluster = cluster;
    this.envVar = envVar;
    this.config = config;
    this.gpuNum = gpuNum;
    this.startTime = startTime;
    this.endtime = endtime;
    this.currentStep = currentStep;
    this.totalStep = totalStep;
    this.state = state;
  }
}
