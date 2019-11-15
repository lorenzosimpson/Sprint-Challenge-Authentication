const request = require('supertest')
const server = require('../api/server')

describe('register router tests', () => {
    it('returns a 400 with no credentials', async () => {
        const response = await request(server).post('/api/auth/register').then(res => res.status)
        expect(response).toEqual(400)
    })

    it('returns a 201 if user created', async () => {
        const responseCode = await request(server).post('/api/auth/register')
        .send({ username: 'Mark', password: 'password'})
        .set('Accept', 'application/json')
        .then(res => res.status)
        expect(responseCode).toEqual(201)
    })
})


describe('login router tests', () => {
    it('returns a 500 with no credentials', async () => {
        const response = await request(server).post('/api/auth/login').then(res => res.status)
        expect(response).toEqual(500)
    })

    it('returns a 200 with correct credentials', async () => {
        const statusCode = await request(server).post('/api/auth/login')
        .send({ username: 'joe', password: 'password'})
        .set('Accept', 'application/json')
        .then(res => res.status);

        expect(statusCode).toEqual(200)
    })
})