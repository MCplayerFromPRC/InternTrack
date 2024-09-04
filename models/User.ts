/* SPDX-FileCopyrightText: 2014-present Kriasoft */
/* SPDX-License-Identifier: MIT */
import { NodeDocument } from "./Document";

export class User extends NodeDocument {
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
