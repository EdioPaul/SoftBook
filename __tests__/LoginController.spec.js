const request = require('supertest')
const server = require('../src/server')
const User = require('../src/models/User')

describe('Login Controller', () => {
  describe('POST /login', () => {
    it('should return a JWT token for a valid user', async () => {
      const user = new User({
        name: 'Test user',
        email: 'teste@example.com',
        password: '123456'
      })
      await user.save()

      const res = await request(server)
        .post('/login')
        .send({
          email: 'teste@example.com',
          password: '123456'
        })

      expect(res.status).toBe(200)
      expect(res.body.auth).toBe(true)
      expect(res.body.token).toBeDefined()

      await user.remove()
    })

    it('should return an error message for an invalid user', async () => {
      const res = await request(server)
        .post('/login')
        .send({
          email: 'test2@example.com',
          password: '123456'
        })

      expect(res.status).toBe(500)
      expect(res.body.message).toBe('Invalid login!')
    })
  })

  describe('GET /logout', () => {
    it('should return an object with auth set to false and token set to null', async () => {
      const res = await request(server).get('/logout')

      expect(res.status).toBe(200)
      expect(res.body.auth).toBe(false)
      expect(res.body.token).toBeNull()
    })
  })
})
