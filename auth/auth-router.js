const router = require('express').Router();
const getToken = require('./getToken');
const validateUser = require('./validateUser-middleware');
const bcrypt = require('bcryptjs');
const db = require('../database/helpers')


router.post('/register', (req, res) => {
  // implement registration
    let user = req.body;
    const validateResult = validateUser(user)

    if (validateResult.isSuccessful === true) {
      const hash = bcrypt.hashSync(user.password, 8)
      user.password = hash; // set the user's password to be stored equal to the hash
      
      db.insert(user)
      .then(added => {
        const token = getToken(user.username)
        res.status(201).json({ message: `Welcome, ${user.username}`, token: token})
      })
      .catch(err => res.status(500).json({ error: 'Could not add user' }))
    }
      else {
        res.status(400).json({
          message: "Invalid information about the user, see errors for details",
          errors: validateResult.errors
        });
      }
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
