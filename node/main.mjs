import dotenv from 'dotenv'
import { WebSocketServer } from 'ws';
import { Agg } from './lib/agg.mjs';

dotenv.config({ path: '../.env' })
const agg = new Agg();
// async function yo() {
//   try {
//     await fetch("http://localhost:3000/server-register")

//   } catch(e) {
//     console.log(Object.entries(e))
//   }

// }
// yo()

agg.sendMetrics()
// const wss = new WebSocketServer({ port: process.env.SERVER_PORT || 3000 });
// wss.on('connection', function connection(ws) {
//   agg.metrics.con += 1
//   ws.onclose = () => {
//     agg.metrics.con -= 1
//   }
//   ws.onerror((event) => {
//     console.log(event)
//   })
//   ws.onmessage((event) => {
//     console.log('received: %s', event);
//   })
//   ws.send('something');
// });
