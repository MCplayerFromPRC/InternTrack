/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import { Duration } from "moment";

import { EdgeDocument } from "./Document";

// [(Checkpoint -> Checkpoint), (TrainConfig -> Checkpoint)]
export class CkptStep extends EdgeDocument {
  tokens: number;
  duration: Duration;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    _from: string,
    _to: string,
    tokens: number,
    duration: Duration,
  ) {
    super(_key, _id, _rev, _from, _to);
    this.tokens = tokens;
    this.duration = duration;
  }
}
