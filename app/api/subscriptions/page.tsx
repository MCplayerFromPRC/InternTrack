
/*
## quote:
1. https://github.com/theogravity/graphql-pothos-server-example/tree/main
2. https://www.apollographql.com/docs/apollo-server/migration/
*/
import {IncomingMessage} from "http";
import { WebSocket, WebSocketServer } from "ws";

import "@/graphql";
import { schema } from "@/lib/properties";
import { useServer } from 'graphql-ws/lib/use/ws';

import { pubsub } from "@/lib/properties";


export function SOCKET(
    client: WebSocket,
    request: IncomingMessage,
    server: WebSocketServer,
) {
    const serverCleanup = useServer({ 
        schema,
        context: async (ctx, msg, args) => {
            return {ctx, msg, args, pubsub};
        },
    }, server);

    console.log('A client connected!');

    client.on('message', message => {
        client.send(message);
    });

    client.on('close', () => {
        console.log('A client disconnected!');
    });
}

