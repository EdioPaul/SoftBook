const server = require('../src/server')
const request = require('supertest')
const mongoose = require('mongoose')
const Book = require('../src/models/Book')

describe('BookController', () => {
  let testBook

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  })

  afterAll(async () => {
    await Book.deleteMany()
    await mongoose.connection.close()
  })

  describe('POST /book', () => {
    it('should create a new book', async () => {
      const book = {
        title: 'Test Book',
        author: 'Test Author',
        ISBN: '1234567890'
      }

      const res = await request(server)
        .post('/book')
        .send(book)

      expect(res.statusCode).toEqual(200)
      expect(res.body.title).toEqual(book.title)
      expect(res.body.author).toEqual(book.author)
      expect(res.body.ISBN).toEqual(book.ISBN)

      testBook = res.body
    })

    it('should return error if book already exists', async () => {
      const book = {
        title: 'Test Book',
        author: 'Test Author',
        ISBN: '1234567890'
      }

      const res = await request(server)
        .post('/book')
        .send(book)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual('Book exists')
    })
  })

  describe('PUT /book/:id', () => {
    it('should update a book', async () => {
      const updatedBook = {
        title: 'Updated Test Book',
        author: 'Updated Test Author'
      }

      const res = await request(server)
        .put(`/book/${testBook.id}`)
        .send(updatedBook)

      expect(res.statusCode).toEqual(200)
      expect(res.body.title).toEqual(updatedBook.title)
      expect(res.body.author).toEqual(updatedBook.author)
    })

    it('should return error if book is already rented', async () => {
      const book = await Book.findById(testBook.id)
      book.is_rent = true
      await book.save()

      const updatedBook = {
        title: 'Updated Test Book',
        author: 'Updated Test Author'
      }

      const res = await request(server)
        .put(`/book/${testBook.id}`)
        .send(updatedBook)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual('Book is already rented')
    })
  })

  describe('DELETE /book/:id', () => {
    it('should remove a book', async () => {
      const res = await request(server)
        .delete(`/book/${testBook.id}`)

      expect(res.statusCode).toEqual(200)

      const book = await Book.findById(testBook.id)
      expect(book).toBeNull()
    })

    it('should return error if book is already rented', async () => {
      const book = await Book.create({
        title: 'Test Book',
        author: 'Test Author',
        ISBN: '1234567890',
        is_rent: true
      })

      const res = await request(server)
        .delete(`/book/${book.id}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual('Book is already rented')
    })
  })
})
