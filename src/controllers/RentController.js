import { Book } from '../models/Book.js'

export const rent = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
    if (!book) {
      return res.json('Book not exist')
    }
    if (book.is_rent === true) {
      return res.json('Book is already rented')
    } else {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
      return res.json(book)
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const devolution = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!book) {
      return res.json('Book not exist')
    }
    return res.json(book)
  } catch (err) {
    throw new Error(err.message)
  }
}
