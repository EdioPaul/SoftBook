import { login, logout } from '../src/controllers/LoginController'
import { User } from '../src/models/User'
import { jest } from '@jest/globals'
import jwt from 'jsonwebtoken'

jest.mock('../src/models/User')
jest.mock('jsonwebtoken')

describe('UserController', () => {
  describe('login', () => {
    it('should return a token if the login is valid', async () => {
      const mockFind = jest.spyOn(User, 'findOne')
      const mockSign = jest.spyOn(jwt, 'sign')

      const mockedUser = {
        id: '123',
        password: '123',
        email: 'teste@teste.com'
      }
      mockFind.mockImplementationOnce(() => Promise.resolve(mockedUser))
      mockSign.mockImplementationOnce(() => 'jwt-token')

      const req = { body: { id: mockedUser.id, password: mockedUser.password } }
      const res = { json: jest.fn() }

      await login(req, res)

      expect(mockFind).toHaveBeenCalledWith({ id: mockedUser.id, password: mockedUser.password })
      expect(mockSign).toHaveBeenCalledWith({ id: mockedUser.id }, process.env.SECRET, { expiresIn: 3600 })
      expect(res.json).toHaveBeenCalledWith({ auth: true, token: 'jwt-token' })
    })

    it('should return an error if the login is invalid', async () => {
      const mockFind = jest.spyOn(User, 'findOne')
      mockFind.mockImplementationOnce(() => Promise.resolve(null))
      const req = { body: { id: 'invalid-user-id', password: 'invalid-password' } }
      const res = { json: jest.fn() }

      await login(req, res)

      expect(mockFind).toHaveBeenCalledWith({ id: 'invalid-user-id', password: 'invalid-password' })
      expect(res.json).toHaveBeenCalledWith('Email not exist or incorrect')
    })
  })

  describe('logout', () => {
    it('should return an empty token', () => {
      const res = { json: jest.fn() }
      logout(res)
      expect(res.json).toHaveBeenCalledWith({ auth: false, token: null })
    })
  })
})
