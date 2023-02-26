const request = require('supertest')
const server = require('../src/server')
const Book = require('../src/models/Book')

describe('Search Controller', () => {
  describe('GET /books/search', () => {
    it('should return a list of books matching the search criteria', async () => {
      const book1 = new Book({
        title: 'Test title',
        author: 'Test author',
        is_rent: false
      })
      const book2 = new Book({
        title: 'Test title 2',
        author: 'Test author 2',
        is_rent: false
      })
      await book1.save()
      await book2.save()

      const res = await request(server)
        .get('/books/search')
        .query({ author: 'Test author' })

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(1)
      expect(res.body[0].title).toBe('Test title')
      expect(res.body[0].author).toBe('Test author')

      await book1.remove()
      await book2.remove()
    })
  })

  describe('GET /books', () => {
    it('should return a list of all books', async () => {
      const book1 = new Book({
        title: 'Test title',
        author: 'Test author',
        is_rent: false
      })
      const book2 = new Book({
        title: 'Test title 2',
        author: 'Test author 2',
        is_rent: false
      })
      await book1.save()
      await book2.save()

      const res = await request(server)
        .get('/books')

      expect(res.status).toBe(200)
      expect(res.body.length).toBe(2)

      await book1.remove()
      await book2.remove()
    })
  })
})
