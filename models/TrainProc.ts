/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Timestamp } from "bson";
import { NodeDocument } from "./Document";

export class TrainProc extends NodeDocument {
  config!: string;
  configPath: string;
  cluster: string;
  envVar: object;
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
    config: string,
    configPath: string,
    cluster: string,
    envVar: object,
    gpuNum: number,
    startTime: Timestamp,
    endtime: Timestamp,
    currentStep: number,
    totalStep: number,
    state: string,
  ) {
    super(_key, _id, _rev);
    this.config = config;
    this.configPath = configPath;
    this.cluster = cluster;
    this.envVar = envVar;
    this.gpuNum = gpuNum;
    this.startTime = startTime;
    this.endtime = endtime;
    this.currentStep = currentStep;
    this.totalStep = totalStep;
    this.state = state;
  }
}
