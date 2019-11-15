const request = require('supertest')
const server = require('../api/server')

describe('jokes router tests', () => {
    it('returns a 400 with no credentials', async () => {
        const response = await request(server).get('/api/jokes').then(res => res.status)
        expect(response).toEqual(400)
    })

    it('responds with 200 ok', async () => {
       const statusCode = await request(server)
          .get('/api/jokes')
          .set('Content-type', 'application/json')
          .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJfMiIsImlhdCI6MTU3MzgzOTMzMiwiZXhwIjoxNTczODQyOTMyfQ.Gei0LhSy5cisy7HuVyBrMUq6NHBEuUlzlS1eUKaO8JQ')
          .then(res => res.status)
      expect(statusCode).toEqual(200)
    })
})