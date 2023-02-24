import { model } from 'mongoose';

const User = model('User');

const EXPIRE = 300;

export async function login(req, res) {
  try {
    const user = await User.find(req.body);
    if (user) {
      const id = user.id;
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: EXPIRE
      });
      return res.json({ auth: true, token: token });
    } else {
      res.status(500).json({ message: 'Invalid login!' });
    }
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function logout(req, res) {
  res.json({ auth: false, token: null });
}