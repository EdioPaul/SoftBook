import { model } from 'mongoose';

const Book = model('Book');

export async function search(req, res) {
  try {
    const book = await Book.find();
    return res.json(book.title);
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function searchById(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    return res.json(book.title);
  } catch (err) {
    throw new Error(err.message);
  }
}