const express = require('express');

const router = express.Router();

router
.get('/', (req, res) => res.render('pages/index'))
.post('/sendtoken', (req, res) => {
  const { token } = req.body;
  console.log("Token --> " + token);
})
export default router;