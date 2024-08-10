import express from 'express';

const app = express();
const PORT = process.env.AGGREGATOR_PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'))

// Start the server
app.listen(PORT, () => {
  console.log(`Aggregator endpoint: http://localhost:${PORT}`);
})
;
