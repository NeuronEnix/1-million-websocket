import WebSocket from 'ws';
import CONFIG from "../config.json" assert { type: "json" };

const ws = new WebSocket(`ws://${CONFIG.HOST}:${CONFIG.PORT}`);

ws.on('error', console.error);

ws.on('open', function open() {
  ws.send('something');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});
