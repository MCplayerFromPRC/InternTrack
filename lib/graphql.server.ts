/*
## quote:
1. https://github.com/theogravity/graphql-pothos-server-example/tree/main
2. https://www.apollographql.com/docs/apollo-server/migration/
*/
import { ApolloServer, BaseContext } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import cors from "cors";
import express, { json } from "express";
import { PubSub } from "graphql-subscriptions";
import { useServer } from "graphql-ws/lib/use/ws";
import http from "http";
import { WebSocketServer } from "ws";

import * as dto from "@/dto";
import { builder } from "@/graphql/builder";
import { registerDirectives } from "@/graphql/directives";

import "./graphql";
import { db } from "./database";
import { pubsub } from "./properties";

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

export async function init({
  gqlPort = 3000,
  graphqlPath = "/api/graphql",
  subscriptionPath = "/api/subscriptions",
}: {
  gqlPort?: number;
  graphqlPath?: string;
  subscriptionPath?: string;
} = {}): Promise<ApolloServer> {
  let builderSchema = builder.toSchema({});

  builderSchema = registerDirectives(builderSchema);

  const cache = new InMemoryLRUCache({
    // ~256MiB
    maxSize: Math.pow(2, 28),
    // 10 minutes (in seconds)
    ttl: 300,
  });

  const app = express();
  const httpServer = http.createServer(app);
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: subscriptionPath,
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const serverCleanup = useServer({ schema: builderSchema }, wsServer);
  const apolloServer = new ApolloServer<GQLContext>({
    cache,
    schema: builderSchema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();

  app.use(
    graphqlPath,
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const { cache } = apolloServer;
        return {
          token: req.headers.token,
          dataSources: {
            ckpts: new dto.CheckpointDatasource(db, cache),
            ckptStep: new dto.CkptStepDatasource(db, cache),
            resumeCkpt: new dto.ResumeCkptDatasource(db, cache),
            config: new dto.TrainConfigDatasource(db, cache),
          },
          pubsub,
        };
      },
    }),
  );

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: gqlPort }, resolve),
  );
  console.log(`
    🚀 Server ready at http://localhost:${gqlPort}${graphqlPath}
    🔌 Server ready at http://localhost:${gqlPort}${subscriptionPath}
  `);
  return apolloServer;
}
