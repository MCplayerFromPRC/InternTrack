/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */

import { NodeDocument } from "./Document";

export class TrainTask extends NodeDocument {
  name: string;
  type: "pretrain" | "sft" | "rlhf_rm" | "rlhf_ppo";
  desc: string;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    name: string,
    type: "pretrain" | "sft" | "rlhf_rm" | "rlhf_ppo",
    desc: string,
  ) {
    super(_key, _id, _rev);
    this.name = name;
    this.type = type;
    this.desc = desc;
  }
}
