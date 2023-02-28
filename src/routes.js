import { create, update, remove } from '../src/controllers/BookController.js'
import { detail } from '../src/controllers/DetailController.js'
import { login, logout } from '../src/controllers/LoginController.js'
import { rent, devolution } from '../src/controllers/RentController.js'
import { search } from '../src/controllers/SearchController.js'
import { verifyJWT } from './utils/verifyJWT.js'
import express from 'express'

const routes = express.Router()

routes.get('/', function (_req, res) {
  res.send('API SoftBook')
})

routes.post('/login', login)
routes.post('/logout', logout)

routes.get('/detail/:id', verifyJWT, detail)

routes.put('/rent/:id', verifyJWT, rent)
routes.put('/devolution/:id', verifyJWT, devolution)

routes.get('/search', verifyJWT, search)

routes.post('/book', verifyJWT, create)
routes.put('/book/:id', verifyJWT, update)
routes.delete('/book/:id', verifyJWT, remove)

export default routes
