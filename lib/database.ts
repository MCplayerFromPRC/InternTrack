import Database from "arangojs";
import { Config } from "arangojs/connection";

export const config: Config = {
  url: process.env.ARANGODB_URL,
  databaseName: process.env.ARANGODB_DATABASE,
  auth: {
    username: process.env.ARANGODB_USER as string,
    password: process.env.ARANGO_ROOT_PASSWORD || process.env.ARANGODB_PASSWORD,
  },
};

// 创建数据库连接
export const db = Database(config);
