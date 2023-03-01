import { Book } from '../models/Book.js'

export const detail = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.json('Book not exist')
    }
    return res.json(book)
  } catch (err) {
    throw new Error(err.message)
  }
}
