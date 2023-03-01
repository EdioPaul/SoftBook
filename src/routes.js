import { create, update, remove } from '../src/controllers/BookController.js'
import { rent, devolution } from '../src/controllers/RentController.js'
import { login, logout } from '../src/controllers/LoginController.js'
import { detail } from '../src/controllers/DetailController.js'
import { search } from '../src/controllers/SearchController.js'
import { verifyJWT } from './utils/verifyJWT.js'
import express from 'express'

const routes = express.Router()

routes.get('/', function (_req, res) {
  res.send('API SoftBook')
})

routes.put('/devolution/:id', verifyJWT, devolution)
routes.put('/rent/:id', verifyJWT, rent)

routes.get('/detail/:id', verifyJWT, detail)

routes.delete('/book/:id', verifyJWT, remove)
routes.put('/book/:id', verifyJWT, update)
routes.post('/book', verifyJWT, create)

routes.get('/search', verifyJWT, search)

routes.post('/logout', logout)
routes.post('/login', login)

export default routes
