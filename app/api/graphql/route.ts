
/*
## quote:
1. https://github.com/theogravity/graphql-pothos-server-example/tree/main
2. https://www.apollographql.com/docs/apollo-server/migration/
*/
import { ApolloServer } from "@apollo/server";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { registerDirectives } from "@/graphql/directives";
import { NextRequest } from 'next/server';

import "@/graphql";
import { builder } from "@/graphql/builder";
import { db } from "@/lib/database";
import { GQLContext } from "@/lib/graphql.server";
import { pubsub } from "@/lib/properties";
import * as dto from "@/dto";

const builderSchema = builder.toSchema({});
export const schema = registerDirectives(builderSchema);

const cache = new InMemoryLRUCache({
    // ~256MiB
    maxSize: Math.pow(2, 28),
    // 10 minutes (in seconds)
    ttl: 300,
});

const apolloServer = new ApolloServer<GQLContext>({
    cache,
    schema
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {context: async ( req, res ) => {
    const { cache } = apolloServer;
    return {
        token: req.cookies.get('token'),
        dataSources: {
            ckpts: new dto.CheckpointDatasource(db, cache),
            ckptStep: new dto.CkptStepDatasource(db, cache),
            resumeCkpt: new dto.ResumeCkptDatasource(db, cache),
            config: new dto.TrainConfigDatasource(db, cache),
        },
        pubsub,
    };
}});

export { handler as GET, handler as POST };
