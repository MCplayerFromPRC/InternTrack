
/*
## quote:
1. https://github.com/theogravity/graphql-pothos-server-example/tree/main
2. https://www.apollographql.com/docs/apollo-server/migration/
*/
import {IncomingMessage} from "http";
import { WebSocket, WebSocketServer } from "ws";

export function SOCKET(
    client: WebSocket,
    request: IncomingMessage,
    server: WebSocketServer,
) {
    console.log(typeof client);

    client.on('message', message => {
        client.send("A client message!");
    });

    client.on('close', () => {
        console.log('A client disconnected!');
    });
}
