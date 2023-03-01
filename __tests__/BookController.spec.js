import { create, update, remove } from '../src/controllers/BookController'
import { Book } from '../src/models/Book'
import { jest } from '@jest/globals'

jest.mock('../src/models/Book')

describe('BookController', () => {
  describe('create', () => {
    it('should create a new book when it does not exist', async () => {
      const mockFindOne = jest.spyOn(Book, 'findOne')
      const mockCreate = jest.spyOn(Book, 'create')

      const req = {
        body: {
          ISBN: 'ABC123',
          title: 'Test Book',
          author: 'Test Author'
        }
      }

      const res = {
        json: jest.fn()
      }

      mockFindOne.mockReturnValue(null)
      mockCreate.mockResolvedValue(req.body)

      await create(req, res)

      expect(mockFindOne).toHaveBeenCalledWith({ ISBN: req.body.ISBN })
      expect(mockCreate).toHaveBeenCalledWith(req.body)
      expect(res.json).toHaveBeenCalledWith(req.body)
    })

    it('should return "Book exists" when the book already exists', async () => {
      const mockFindOne = jest.spyOn(Book, 'findOne')

      const req = {
        body: {
          ISBN: 'ABC123',
          title: 'Test Book',
          author: 'Test Author'
        }
      }

      const res = {
        json: jest.fn()
      }

      mockFindOne.mockReturnValue(req.body)

      await create(req, res)

      expect(mockFindOne).toHaveBeenCalledWith({ ISBN: req.body.ISBN })
      expect(res.json).toHaveBeenCalledWith(`Book ISBN ${req.body.ISBN} exists`)
    })
  })

  describe('update', () => {
    it('should update a book when it is not rented', async () => {
      const mockFindById = jest.spyOn(Book, 'findById')
      const mockFindByIdAndUpdate = jest.spyOn(Book, 'findByIdAndUpdate')

      const bookId = '123'
      const bookData = {
        title: 'Old Title'
      }
      const updatedBookData = {
        title: 'New Title'
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

      await update(req, res)

      expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
        bookId,
        req.body,
        { new: true }
      )
      expect(res.json).toHaveBeenCalledWith(updatedBookData)
    })

    it('should return "Book is already rented" when the book is rented', async () => {
      const mockFindById = jest.spyOn(Book, 'findById')
      const req = {
        params: {
          id: '123'
        },
        body: {
          title: 'New Title'
        }
      }

      const res = {
        json: jest.fn()
      }

      const book = {
        _id: '123',
        title: 'Old Title',
        is_rent: true
      }

      mockFindById.mockResolvedValue(book)

      await update(req, res)

      expect(mockFindById).toHaveBeenCalledWith(req.params.id)
      expect(res.json).toHaveBeenCalledWith('Book is already rented')
    })
  })

  describe('remove', () => {
    it('should remove a book when it is not rented', async () => {
      const mockFindById = jest.spyOn(Book, 'findById')
      const mockFindByIdAndRemove = jest.spyOn(Book, 'findByIdAndRemove')
      const req = {
        params: {
          id: '123'
        }
      }

      const res = {
        send: jest.fn()
      }

      const book = {
        _id: '123',
        is_rent: false
      }

      mockFindById.mockResolvedValue(book)
      mockFindByIdAndRemove.mockResolvedValue()

      await remove(req, res)

      expect(mockFindById).toHaveBeenCalledWith(req.params.id)
      expect(mockFindByIdAndRemove).toHaveBeenCalledWith(req.params.id)
      expect(res.send).toHaveBeenCalled()
    })

    it('should return "Book is already rented" when the book is rented', async () => {
      const mockFindById = jest.spyOn(Book, 'findById')
      const req = {
        params: {
          id: '123'
        }
      }

      const res = {
        json: jest.fn()
      }

      const book = {
        _id: '123',
        is_rent: true
      }

      mockFindById.mockResolvedValue(book)

      await remove(req, res)

      expect(mockFindById).toHaveBeenCalledWith(req.params.id)
      expect(res.json).toHaveBeenCalledWith('Book is already rented')
    })
  })
})
