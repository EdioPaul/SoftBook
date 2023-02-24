import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

model('User', UserSchema);
