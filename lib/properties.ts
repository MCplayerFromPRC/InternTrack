import pino from "pino";
import { Database } from "arangojs";
import { GraphQLSchema } from "graphql/type";
import { PubSub } from "graphql-subscriptions";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { BaseContext } from "@apollo/server";
import { Container } from "inversify";

import "@/graphql";
import { builder } from "@/graphql/builder";
import { registerDirectives } from "@/graphql/directives";
import { DataSourceOptions } from "@/dto/BaseDatasource/BaseDTO";
import { config } from "@/lib/database";
import * as dto from "@/dto";

export const TYPES = {
  PubSub: Symbol.for("PubSub"),
  Database: Symbol.for("Database"),
  GraphQLSchema: Symbol.for("GraphQLSchema"),
  KeyValueCache: Symbol.for("InMemoryLRUCache"),
  DataSourceOptions: Symbol.for("DataSourceOptions")
};

const container = new Container({ 
  defaultScope: "Singleton", 
  autoBindInjectable: true 
});

container.bind<Database>(TYPES.Database).toConstantValue(new Database(config));
container.bind<InMemoryLRUCache>(TYPES.KeyValueCache).toConstantValue(new InMemoryLRUCache({
  // ~256MiB
  maxSize: Math.pow(2, 28),
  // 10 minutes (in seconds)
  ttl: 600,
}));
container.bind<DataSourceOptions>(TYPES.DataSourceOptions).toConstantValue({logger: pino({})})
container.bind<PubSub>(TYPES.PubSub).toConstantValue(new PubSub())
const builderSchema = builder.toSchema({});
export const schema = registerDirectives(builderSchema)
container.bind<GraphQLSchema>(TYPES.GraphQLSchema).toConstantValue(schema)

export { container };

export interface GQLContext extends BaseContext {
  token?: string;
  dataSources?: {
    ckpts: dto.CheckpointDatasource;
    ckptStep: dto.CkptStepDatasource;
    resumeCkpt: dto.ResumeCkptDatasource;
    config: dto.TrainConfigDatasource;
  };
  pubsub?: PubSub;
}
