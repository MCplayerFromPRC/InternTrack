/*
## quote:
1. https://github.com/apteryxxyz/next-ws
2. https://github.com/YeonV/meeting
*/
import { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";

/* eslint-disable @typescript-eslint/no-unused-vars */
export function SOCKET(
  client: WebSocket,
  request: IncomingMessage,
  server: WebSocketServer,
) {
  console.log(typeof client);

  client.on("message", (message) => {
    client.send("A client message!");
  });

  client.on("close", () => {
    console.log("A client disconnected!");
  });
}
/* eslint-enable @typescript-eslint/no-unused-vars */
