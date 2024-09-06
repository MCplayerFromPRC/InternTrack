/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import moment from "moment";

import { EdgeDocument } from "./Document";

// [(Checkpoint -> Checkpoint), (TrainConfig -> Checkpoint)]
export class CkptStep extends EdgeDocument {
  steps?: number;
  tokens?: number;
  duration?: moment.Duration;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    _from: string,
    _to: string,
    steps?: number,
    tokens?: number,
    duration?: moment.Duration | string,
  ) {
    super(_key, _id, _rev, _from, _to);
    this.steps = steps;
    this.tokens = tokens;
    if (typeof duration === "string") {
      duration = moment.duration(duration);
    }
    this.duration = duration;
  }
}
