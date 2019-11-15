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
  const { username, password } = req.body;

  db.findByUserName(username)
  .then(user => {
    if ( user && bcrypt.compareSync(password, user.password)) {
      const token = getToken(user.username)
      res.status(200).json({message: `Welcome ${user.username}! have a token...`, token})
    } else {
      res.status(401).json({ error: 'Invalid credentials'})
    }
  })
  .catch(err => res.status(500).json({ error: 'Could not log in' }))


});

module.exports = router;
