import { model } from 'mongoose';

const Book = model('Book');

export async function rentBook(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (book.is_rent) {
      throw new Error('Book is already rented');
    } else {
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      return res.json(book);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}