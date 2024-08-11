import express from "express"

const router = express.Router();

router.post("/server-register", (req, res) => {
  const data = req.body;
  console.log(data)
  res.sendStatus(200);
});

router.get('/server-metrics', (req, res) => {

})
router.post('/server-metrics', (req, res) => {
  const data = req.body;
  console.log(data)
  res.sendStatus(200);
});
