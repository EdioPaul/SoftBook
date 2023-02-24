import { Schema, model } from 'mongoose';

const BookSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  summary: {
    type: String,
    require: true,
  },
  ISBN: {
    type: String,
    require: true,
  },
  genre: {
    type: String,
    require: true,
  },
  is_rent: {
    type: Boolean,
    default: false,
    require: true,
  }
});

model('Book', BookSchema);
