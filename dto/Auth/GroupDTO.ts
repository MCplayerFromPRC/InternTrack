import type { KeyValueCache } from "@apollo/utils.keyvaluecache";
import { Database } from "arangojs";
import { injectable, inject } from "inversify";

import { Group } from "@/models";
import { BaseCollectionDatasource } from "@/dto/BaseDatasource/BaseDocumentDTO";
import type { DataSourceOptions } from "@/dto/BaseDatasource/BaseDTO";
import { TYPES } from "@/lib/properties";

@injectable()
export class GroupDatasource extends BaseCollectionDatasource<Group> {
  constructor(
    @inject(TYPES.Database) db: Database,
    @inject(TYPES.KeyValueCache) cache: KeyValueCache,
    @inject(TYPES.DataSourceOptions) options: DataSourceOptions = {},
  ) {
    super(db, db.collection("Group"), cache, options);
  }

  async createOne(group: Partial<Group>) {
    const { name, ...others } = group;
    if (name) {
      const empty = await this.findManyByKeys({ _key: name });
      if (empty.length === 1) {
        throw new Error(`Group ${name} already exist.`);
      } else if (empty.length === 0) {
        return super.createOne({
          _key: name,
          ...others,
        });
      }
    } else {
      throw new Error(`Group must have "name" attribute.`);
    }
  }

  async createMany(groups: Partial<Group>[]) {
    const result = new Map<string, string>();
    for (const group of groups) {
      result.set(group.name!, (await this.createOne(group))._id);
    }
    return result;
  }
}
