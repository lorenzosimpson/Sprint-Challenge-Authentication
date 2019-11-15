const jwt = require('jsonwebtoken')

function getToken(username) {
    const payload = {username}
    const secret = process.env.JWT_SECRET || 'this is so secret, good luck hacking!';
    const options = { expiresIn: '1hr'}

    return jwt.sign(payload, secret, options)
}


module.exports = getToken;