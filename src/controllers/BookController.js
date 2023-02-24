import { model } from 'mongoose';

const Book = model('Book');

export async function create(req, res) {
  try {
    const book = await Book.create(req.body);
    return res.json(book);
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function update(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (book) {
      throw new Error('Book is already exist');
    } else {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    return res.json(book);
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function remove(req, res) {
  try {
    const book = await Book.findById(req.params.id);
    if (book.is_rent) {
      throw new Error('Book is already rented');
    } else {
    await Book.findByIdAndRemove(req.params.id);
    return res.send();
    }
  } catch (err) {
    throw new Error(err.message);
  }
}