const router = require('express').Router();

const authenticate = require('./authenticate-middleware')

router.post('/register', (req, res) => {
  // implement registration
  
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
