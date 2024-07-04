import { Database, aql } from "arangojs";
import { GraphQLError } from "graphql/error";
import { injectable } from "inversify"; 

export const isArangoDb = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  maybeDatabase: any,
): maybeDatabase is Database => {
  return maybeDatabase.isArangoDatabase && maybeDatabase.name;
};

export type Logger = {
  // Ordered from least-severe to most-severe.
  debug(message?: string): void;
  info(message?: string): void;
  warn(message?: string): void;
  error(message?: string): void;
  fatal(message?: string): void;
  trace(message?: string): void;
};

export interface DataSourceOptions {
  logger?: Logger;
}

export type QueryObject = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

@injectable()
export class BaseDatasource {
  db: Database;
  options: DataSourceOptions;

  constructor(db: Database, options: DataSourceOptions = {}) {
    options?.logger?.info(`ArangoDataSource started`);
    if (!isArangoDb(db)) {
      throw new GraphQLError(
        "ArangoDataSource must be created with a ArangoDb (from arangojs)",
      );
    }
    this.db = db;
    this.options = options;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async executeQuery<T = any>(query: string): Promise<T[]> {
    const cursor = await this.db.query<T>(query);
    const results = await cursor.all();
    return results;
  }

  buildAQLCondition(obj: QueryObject, parentKey: string = "doc"): string {
    const conditions: string[] = [];

    for (const key in obj) {
      const value = obj[key];
      const currentKey = `${parentKey}.${key}`;
      if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === "object" && item !== null) {
            conditions.push(
              `SOME ${key}Item IN ${currentKey} SATISFIES ${this.buildAQLCondition(item, `${key}Item`)} END`,
            );
          } else {
            conditions.push(
              `SOME ${key}Item IN ${currentKey} SATISFIES ${key}Item == ${JSON.stringify(item)} END`,
            );
          }
        });
      } else if (typeof value === "object" && value !== null) {
        conditions.push(`(${this.buildAQLCondition(value, currentKey)})`);
      } else {
        conditions.push(`${currentKey} == ${JSON.stringify(value)}`);
      }
    }
    return conditions.join(" AND ");
  }
}
