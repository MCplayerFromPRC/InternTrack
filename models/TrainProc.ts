/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { NodeDocument } from "./Document";

export class TrainProc extends NodeDocument {
  md5!: string;
  config!: string;
  ckpt: string;
  cluster: string;
  envVar: object;
  gpuNum: number;
  startTime: Date;
  endtime: Date;
  currentStep: number;
  totalStep: number;
  state: "running" | "finished" | "failed";

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    md5: string,
    config: string,
    ckpt: string,
    cluster: string,
    envVar: object,
    gpuNum: number,
    startTime: Date,
    endtime: Date,
    currentStep: number,
    totalStep: number,
    state: "running" | "finished" | "failed",
  ) {
    super(_key, _id, _rev);
    this.md5 = md5;
    this.config = config;
    this.ckpt = ckpt;
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
