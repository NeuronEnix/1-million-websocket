import dotenv from 'dotenv'
import WebSocket from 'ws';
import { Agg } from './lib/agg.mjs';
dotenv.config({ path: '../.env' })

const agg = new Agg()
agg.sendMetrics()
agg.syncConnectionCount()

const wsList = [];
const WS_URL = `ws://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`

function syncConnectionCount() {

  if ( agg.connectionCount > wsList.length ) {
    const numberOfNewConnections = agg.connectionCount - wsList.length

    for (let i = 0; i < numberOfNewConnections; i++) {
      const ws = new WebSocket(WS_URL);
      wsList.push(ws)
      ws.on('error', (err) => {
        console.log("Client websocket dead")
        console.error(err)
        process.exit(1)
      });
      ws.on('open', function open() {
        ws.send('something');
      });

      ws.on('message', function message(data) {
        // console.log('received: %s', data);
      });
    }
  }
  if ( agg.connectionCount < wsList.length ) {
    const numberOfConnectionsToRemove = wsList.length - agg.connectionCount
    for (let i = 0; i < numberOfConnectionsToRemove; i++) {
      const ws = wsList.pop()
      ws.close()
    }
  }

  setTimeout(syncConnectionCount, 100)
}
syncConnectionCount()
