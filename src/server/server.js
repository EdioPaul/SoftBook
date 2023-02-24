import express, { json } from 'express';
import { connect } from 'mongoose';
import requireDir from 'require-dir';
import cors from 'cors';
require('dotenv-safe').config();

const jwt = require('jsonwebtoken');

const app = express();

app.use(json());
app.use(cors());
connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

requireDir('./src/models');

app.use('/api', require('../routes').default);

app.listen(3001);
console.log('Listening on port 3001');