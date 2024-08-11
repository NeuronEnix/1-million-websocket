import bodyParser from 'body-parser';
import express from 'express';
import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })

const app = express();
const PORT = process.env.AGGREGATOR_PORT || 3001;

// Serve static files from the 'public' directory
app.use(express.static('public'))
app.use(bodyParser.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Aggregator endpoint: http://localhost:${PORT}`);
});
