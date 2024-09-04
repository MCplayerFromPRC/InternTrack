import bcrypt from "bcrypt";
import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { User } from "@/models";
import { BaseCollectionDatasource } from "@/dto/BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "@/dto/BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class UserDatasource extends BaseCollectionDatasource<User> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("User"), cache, options);
  }

  async findOnlyOneByEmail(email: string) {
    const user = await this.findManyByKeys({ email });
    if (user.length == 0) {
      throw new Error(`No User ${email} found.`);
    } else if (user.length > 1) {
      throw new Error(
        `Conflict email ${email} for users ${user.map((u) => u._id)}.`,
      );
    }
    return user[0];
  }

  async createMany(users: Partial<User & { groups: string[] }>[]) {
    const userMap = new Map<string, string[]>();
    for (const { groups, password, ...user } of users) {
      const savedUser = await this.createOne({
        password: await bcrypt.hash(password!, 10),
        ...user,
      });
      let isUser = false;
      if (groups) {
        for (const group of groups) {
          if (group === "User") {
            isUser = true;
          }
          if (userMap.has(group)) {
            const list = userMap.get(group)!;
            list.push(savedUser._id);
            userMap.set(group, list);
          } else {
            userMap.set(group, [savedUser._id]);
          }
        }
      }
      if (!isUser) {
        if (userMap.has("User")) {
          const list = userMap.get("User")!;
          list.push(savedUser._id);
          userMap.set("User", list);
        } else {
          userMap.set("User", [savedUser._id]);
        }
      }
    }
    return userMap;
  }
}
