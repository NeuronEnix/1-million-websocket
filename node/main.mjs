import dotenv from 'dotenv'
import { WebSocketServer } from 'ws';
import { Agg } from './lib/agg.mjs';

dotenv.config({ path: '../.env' })

const agg = new Agg();

agg.sendMetrics()

const wss = new WebSocketServer({ port: process.env.SERVER_PORT || 3000 });
wss.on('connection', function connection(ws) {
  agg.metrics.con += 1

  ws.on('error',(err) => {
    console.log("Node Socket Dead")
    console.error(err)
    process.exit(1)
  });

  ws.on("close",(code, reason) => {
    agg.metrics.con -= 1
  })

  ws.on('message', function message(data) {
    agg.metrics.msg.received += 1
    agg.metrics.bytes.received += data.length

    const sendData = `From server: ${data}`
    agg.metrics.msg.sent += 1
    agg.metrics.bytes.sent += sendData.length
    ws.send( sendData );
  });

});
