const express = require('express');
const router = express.Router();

// Placeholder Email route
router.post('/', (req, res) => {
  res.send('Send-email route works!');
});

module.exports = router;
