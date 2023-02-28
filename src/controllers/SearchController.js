import { Book } from '../models/Book.js'

export const search = async (req, res) => {
  try {
    const filter = req.query
    if (filter) {
      const bookFilter = await Book.find(filter)
      return res.json(bookFilter)
    } else {
      const book = await Book.find()
      return res.json(book)
    }
  } catch (err) {
    return res.json('Error searching for books.')
  }
}
