const request = require('supertest')
const server = require('../src/server')
const mongoose = require('mongoose')
const Book = require('../src/models/Book')

describe('Detail Controller', () => {
  let bookId

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    await Book.deleteMany({})
    const book = new Book({
      title: 'Test Book',
      author: 'Test Author',
      genre: 'Test Genre',
      description: 'Test description'
    })
    await book.save()
    bookId = book._id.toString()
  })

  afterAll(async () => {
    await Book.deleteMany({})
    await mongoose.disconnect()
  })

  describe('GET /books/:id', () => {
    test('should return a book by its id', async () => {
      const response = await request(server).get(`/books/${bookId}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('title', 'Test Book')
      expect(response.body).toHaveProperty('author', 'Test Author')
      expect(response.body).toHaveProperty('genre', 'Test Genre')
      expect(response.body).toHaveProperty('description', 'Test description')
    })

    test('should return a 404 error if book is not found', async () => {
      const response = await request(server).get(`/books/${mongoose.Types.ObjectId()}`)
      expect(response.status).toBe(404)
    })
  })
})
