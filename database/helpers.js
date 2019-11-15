const db = require('./dbConfig')

module.exports = {
    insert,
    findById,
    findByUserName
}

function insert(user) {
    return db('users').insert(user)
}

function findById(id) {
    return db('users')
    .where({ id })
    .first()
}

function findByUserName(username) {
    return db('users')
    .where({ username })
    .first()
}