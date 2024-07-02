
/*
## quote:
1. https://github.com/theogravity/graphql-pothos-server-example/tree/main
2. https://www.apollographql.com/docs/apollo-server/migration/
*/
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';

import { 
    cache, 
    pubsub, 
    schema, 
    GQLContext,
    ckpts,
    ckptStep,
    resumeCkpt,
    config,
} from "@/lib/properties";

const apolloServer = new ApolloServer<GQLContext>({
    cache,
    schema
});

const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {context: async ( req, res ) => {
    return {
        token: req.cookies.get('token'),
        dataSources: {
            ckpts,
            ckptStep,
            resumeCkpt,
            config,
        },
        pubsub,
    };
}});

export { handler as GET, handler as POST };
