import { Router } from 'express';
const routes = Router();

import { verifyJWT } from './utils/verifyJWT';
import { create, update, remove } from './controllers/BookController';
import { search, searchById } from './controllers/SearchController';
import { login, logout } from './controllers/LoginController';
import { detail } from './controllers/DetailController';
import { rentBook } from './controllers/RentController';

routes.post('/login', login);
routes.post('/logout', logout);

routes.get('/detail', verifyJWT, detail);

routes.get('/rent', verifyJWT, rentBook);

routes.get('/search', verifyJWT, search);
routes.get('/search/:id', verifyJWT, searchById);

routes.post('/book', verifyJWT, create);
routes.put('/book/:id', verifyJWT, update);
routes.delete('/book/:id', verifyJWT, remove);

export default routes; 