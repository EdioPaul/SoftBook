const request = require('supertest')
const server = require('../src/server')
const Book = require('../src/models/Book')

describe('Rent Controller', () => {
  describe('PUT /books/:id/rent', () => {
    it('should rent a book if it is available', async () => {
      const book = new Book({
        title: 'Test title',
        author: 'Test author',
        is_rent: false
      })
      await book.save()

      const res = await request(server)
        .put(`/books/${book.id}/rent`)
        .send({
          is_rent: true
        })

      expect(res.status).toBe(200)
      expect(res.body.title).toBe('Test title')
      expect(res.body.author).toBe('Test author')
      expect(res.body.is_rent).toBe(true)

      await book.remove()
    })

    it('should return an error message if the book is already rented', async () => {
      const book = new Book({
        title: 'Test title',
        author: 'Test author',
        is_rent: true
      })
      await book.save()

      const res = await request(server)
        .put(`/books/${book.id}/rent`)
        .send({
          is_rent: true
        })

      expect(res.status).toBe(200)
      expect(res.body).toBe('Book is already rented')

      await book.remove()
    })
  })
})
