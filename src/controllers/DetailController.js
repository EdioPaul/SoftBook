import { model } from 'mongoose';

const Book = model('Book');

export async function detail(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    return res.json(book);
  } catch (err) {
    throw new Error(err.message);
  }
}