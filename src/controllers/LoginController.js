import { User } from '../models/User.js'
import jwt from 'jsonwebtoken'

const EXPIRE_TOKEN = 3600

export const login = async (req, res) => {
  try {
    const email = await User.findOne(req.body)
    if (!email) {
      return res.json('Email not exist or incorrect')
    }
    if (email) {
      const id = email.id
      const token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: EXPIRE_TOKEN
      })
      return res.json({ auth: true, token })
    } else {
      res.status(500).json({ message: 'Invalid login!' })
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export const logout = async (res) => {
  res.json({ auth: false, token: null })
}
