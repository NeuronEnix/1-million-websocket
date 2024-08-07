import { WebSocketServer } from 'ws';
import CONFIG from "../config.json" assert { type: "json" };

const wss = new WebSocketServer({ port: CONFIG.PORT });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('something');
});
