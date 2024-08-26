/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { Document, Edge } from "arangojs/documents";

// for ([(Checkpoint -> TrainConfig), (Checkpoint -> EvalResult)])
export class NodeDocument implements Document {
  _key!: string;
  _id!: string;
  _rev!: string;

  constructor(_key: string, _id: string, _rev: string) {
    this._key = _key;
    this._id = _id;
    this._rev = _rev;
  }

  get saveDocument(): object {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _key, _id, _rev, ...others } = this;
    return others;
  }
}

// for ([(Checkpoint -> EvalResult)])
export class EdgeDocument extends NodeDocument implements Edge {
  _from!: string;
  _to!: string;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    _from: string,
    _to: string,
  ) {
    super(_key, _id, _rev);
    this._from = _from;
    this._to = _to;
  }
}
