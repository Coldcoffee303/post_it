const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.send('<h1>Home Page</h1>');
  // res.sendFile('login.html', { root: 'project-server/views' });
});

module.exports = router;
