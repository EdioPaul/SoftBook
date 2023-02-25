const Book = require('../models/Book')

module.exports = {
  async books (_req, res) {
    try {
      const book = await Book.find()
      return res.json(book)
    } catch (err) {
      throw new Error(err.message)
    }
  },

  async search (req, res) {
    try {
      const filter = req.query
      const book = await Book.find(filter)
      return res.json(book)
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
