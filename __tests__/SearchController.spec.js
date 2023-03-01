import { search } from '../src/controllers/SearchController'
import { Book } from '../src/models/Book'
import { jest } from '@jest/globals'

jest.mock('../src/models/Book', () => ({
  find: jest.fn()
}))

describe('search function', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all books when no filter is provided', async () => {
    const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }]
    const mockFind = jest.spyOn(Book, 'find')

    mockFind.mockResolvedValueOnce(mockBooks)

    const req = { query: {} }
    const res = { json: jest.fn() }

    await search(req, res)

    expect(mockFind).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(mockBooks)
  })

  it('should return books filtered by query parameters', async () => {
    const mockBooks = [{ title: 'Book 1' }, { title: 'Book 2' }]
    const mockFind = jest.spyOn(Book, 'find')

    mockFind.mockResolvedValueOnce(mockBooks)

    const req = { query: { title: 'Book 1' } }
    const res = { json: jest.fn() }

    await search(req, res)

    expect(mockFind).toHaveBeenCalledTimes(1)
    expect(mockFind).toHaveBeenCalledWith({ title: 'Book 1' })
    expect(res.json).toHaveBeenCalledTimes(1)
    expect(res.json).toHaveBeenCalledWith(mockBooks)
  })

  it('should throw an error when an error occurs', async () => {
    const mockError = new Error('Error searching for books.')
    const mockFind = jest.spyOn(Book, 'find')

    mockFind.mockRejectedValueOnce(mockError)

    const req = { query: {} }
    const res = { json: jest.fn(), status: jest.fn().mockReturnThis() }

    await search(req, res)

    expect(res.json).toHaveBeenCalledTimes(1)
  })
})
