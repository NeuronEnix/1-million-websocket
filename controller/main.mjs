import fs from 'fs';
import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv'
import { Metrics } from './lib/metrics.mjs';
fs.existsSync('../.env') && dotenv.config({ path: '../.env' })
const meta = {
  connectionCount: 1000,
}

const metrics = new Metrics();

const app = express();
const PORT = process.env.AGGREGATOR_PORT || 3001;

// Serve static files from the 'public' directory
app.use(express.static('public'))
app.use(bodyParser.json());
app.post("/server-register", (req, res) => {
  const data = req.body;
  data.ip = req.ip
  metrics.registerServer({
    host: data.host,
    ip: data.ip
  });
  res.sendStatus(200);
});

app.get('/get-metrics', (req, res) => {
  res.send(metrics.get());
})
app.post('/server-metrics', (req, res) => {
  const data = req.body;
  data.ip = req.ip;
  if ( data.host === "client" )
    data.host += `-${data.ip.split(".")[3]}`
  metrics.pushServerMetrics(data);
  res.sendStatus(200);
});

app.post('/server-connection-count', (req, res) => {
  const data = req.body;
  meta.connectionCount = data.connectionCount
  res.sendStatus(200);
});

app.get('/server-connection-count', (req, res) => {
  res.send({
    connectionCount: meta.connectionCount
  })
});

// Start the server
app.listen(PORT, () => {
  console.log(`Aggregator endpoint: http://localhost:${PORT}`);
});
