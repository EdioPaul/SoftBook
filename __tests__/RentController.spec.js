import { rent, devolution } from '../src/controllers/RentController'
import { Book } from '../src/models/Book'
import { jest } from '@jest/globals'

jest.mock('../src/models/Book')

describe('rentBook()', () => {
  it('should return "Book is already rented" if book is already rented', async () => {
    const mockFindById = jest.spyOn(Book, 'findById')

    const bookId = '123'
    const bookData = {
      is_rent: true
    }

    mockFindById.mockResolvedValue(bookData)

    const req = {
      params: {
        id: bookId
      }
    }
    const res = {
      json: jest.fn()
    }

    await rent(req, res)

    expect(res.json).toHaveBeenCalledWith('Book is already rented')
  })

  it('should update book document and return updated book if book is not rented', async () => {
    const mockFindById = jest.spyOn(Book, 'findById')
    const mockFindByIdAndUpdate = jest.spyOn(Book, 'findByIdAndUpdate')

    const bookId = '123'
    const bookData = {
      is_rent: false
    }
    const updatedBookData = {
      is_rent: true
    }
    mockFindById.mockResolvedValue(bookData)
    mockFindByIdAndUpdate.mockResolvedValue(updatedBookData)

    const req = {
      params: {
        id: bookId
      },
      body: {
      }
    }
    const res = {
      json: jest.fn()
    }

    await rent(req, res)

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      bookId,
      req.body,
      { new: true }
    )
    expect(res.json).toHaveBeenCalledWith(updatedBookData)
  })

  it('should update book if devolution', async () => {
    const mockFindById = jest.spyOn(Book, 'findById')
    const mockFindByIdAndUpdate = jest.spyOn(Book, 'findByIdAndUpdate')

    const bookId = '123'
    const bookData = {
      is_rent: true
    }
    const updatedBookData = {
      is_rent: false
    }
    mockFindById.mockResolvedValue(bookData)
    mockFindByIdAndUpdate.mockResolvedValue(updatedBookData)

    const req = {
      params: {
        id: bookId
      },
      body: {
      }
    }
    const res = {
      json: jest.fn()
    }

    await devolution(req, res)

    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      bookId,
      req.body,
      { new: true }
    )
    expect(res.json).toHaveBeenCalledWith(updatedBookData)
  })
})
