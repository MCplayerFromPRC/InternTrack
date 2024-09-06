/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import { NodeDocument, EdgeDocument } from "./Document";

export class Group extends NodeDocument {
  name: string;
  email: string;
  password: string;

  constructor(
    _key: string,
    _id: string,
    _rev: string,
    name: string,
    email: string,
    password: string,
  ) {
    super(_key, _id, _rev);
    this.name = name;
    this.email = email;
    this.password = password;
  }
}

// User -> Group
export class MemberOf extends EdgeDocument {
  constructor(
    _key: string,
    _id: string,
    _rev: string,
    _from: string,
    _to: string,
  ) {
    super(_key, _id, _rev, _from, _to);
  }
}
