
/*
## quote:
1. https://github.com/theogravity/graphql-pothos-server-example/tree/main
2. https://www.apollographql.com/docs/apollo-server/migration/
*/
import { ApolloServer } from "@apollo/server";
import { NextRequest } from 'next/server';
import { GraphQLSchema } from "graphql/type";
import { PubSub } from "graphql-subscriptions";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import 'reflect-metadata';

import { GQLContext, container, TYPES } from "@/lib/properties";
import {
    CheckpointDatasource,
    CkptStepDatasource,
    ResumeCkptDatasource,
    TrainConfigDatasource,
} from "@/dto";

const apolloServer = new ApolloServer<GQLContext>({
    cache: container.get<InMemoryLRUCache>(TYPES.KeyValueCache),
    schema: container.get<GraphQLSchema>(TYPES.GraphQLSchema),
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {context: async ( req, res ) => {
    return {
        token: req.cookies.get('token'),
        dataSources: {
            ckpts: container.get<CheckpointDatasource>(CheckpointDatasource),
            ckptStep: container.get<CkptStepDatasource>(CkptStepDatasource),
            resumeCkpt: container.get<ResumeCkptDatasource>(ResumeCkptDatasource),
            config: container.get<TrainConfigDatasource>(TrainConfigDatasource),
        },
        pubsub: container.get<PubSub>(TYPES.PubSub),
    };
}});

export { handler as GET, handler as POST };
