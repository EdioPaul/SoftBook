import { detail } from '../src/controllers/DetailController'
import { Book } from '../src/models/Book'
import { jest } from '@jest/globals'

describe('BookController detail', () => {
  it('should return the book detail', async () => {
    const mockFindById = jest.spyOn(Book, 'findById')
    const mockBook = {
      id: '123',
      title: 'Test Book',
      author: 'Test Author',
      ISBN: 'ABC123'
    }
    mockFindById.mockResolvedValue(mockBook)

    const req = {
      params: {
        id: '123'
      }
    }
    const res = {
      json: jest.fn()
    }
    await detail(req, res)

    expect(mockFindById).toHaveBeenCalledWith('123')

    expect(res.json).toHaveBeenCalledWith(mockBook)

    mockFindById.mockRestore()
  })

  it('should throw an error if Book.findById fails', async () => {
    const mockFindById = jest.spyOn(Book, 'findById')
    mockFindById.mockRejectedValue(new Error('Error finding book'))

    const req = {
      params: {
        id: '123'
      }
    }
    const res = {
      json: jest.fn()
    }
    await expect(detail(req, res)).rejects.toThrow('Error finding book')

    expect(mockFindById).toHaveBeenCalledWith('123')

    mockFindById.mockRestore()
  })
})
