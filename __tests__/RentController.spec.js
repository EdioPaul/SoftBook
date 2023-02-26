const Book = require('..src/models/Book')
const bookController = require('../src/controllers/BookController')

jest.mock('../src/models/Book')

describe('rentBook()', () => {
  test('should return "Book is already rented" if book is already rented', async () => {
    const bookId = '123'
    const bookData = {
      is_rent: true
      // other book data
    }
    Book.findById.mockResolvedValue(bookData)

    const req = {
      params: {
        id: bookId
      }
    }
    const res = {
      json: jest.fn()
    }

    await bookController.rentBook(req, res)

    expect(res.json).toHaveBeenCalledWith('Book is already rented')
  })

  test('should update book document and return updated book if book is not rented', async () => {
    const bookId = '123'
    const bookData = {
      is_rent: false
      // other book data
    }
    const updatedBookData = {
      is_rent: true
      // other book data
    }
    Book.findById.mockResolvedValue(bookData)
    Book.findByIdAndUpdate.mockResolvedValue(updatedBookData)

    const req = {
      params: {
        id: bookId
      },
      body: {
        // new book data
      }
    }
    const res = {
      json: jest.fn()
    }

    await bookController.rentBook(req, res)

    expect(Book.findByIdAndUpdate).toHaveBeenCalledWith(
      bookId,
      req.body,
      { new: true }
    )
    expect(res.json).toHaveBeenCalledWith(updatedBookData)
  })
})
