import { PubSub } from "graphql-subscriptions";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { BaseContext } from "@apollo/server";
import "@/graphql";
import { builder } from "@/graphql/builder";
import { registerDirectives } from "@/graphql/directives";
import { db } from "@/lib/database";
import * as dto from "@/dto";

export const pubsub = new PubSub();
export const cache = new InMemoryLRUCache({
    // ~256MiB
    maxSize: Math.pow(2, 28),
    // 10 minutes (in seconds)
    ttl: 300,
});
const builderSchema = builder.toSchema({});
export const schema = registerDirectives(builderSchema);

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

export const ckpts = new dto.CheckpointDatasource(db, cache);
export const ckptStep = new dto.CkptStepDatasource(db, cache);
export const resumeCkpt = new dto.ResumeCkptDatasource(db, cache);
export const config = new dto.TrainConfigDatasource(db, cache);