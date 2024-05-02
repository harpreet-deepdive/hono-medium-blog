import express from "express";
import WebSocket, { WebSocketServer } from "ws";

const app = express();
const httpServer = app.listen(8080, () => {
  console.log("server is up on port 8080");
});

const wss = new WebSocketServer({ server: httpServer });

wss.on("connection", (ws) => {
  ws.on("error", console.error);
  // ws.send("Hello! Message From Server!!");

  ws.on("message", (message) => {
    const data = JSON.parse(message.toString());

    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    });
  });
});

export default app;
