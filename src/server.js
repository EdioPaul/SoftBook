const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')
const routes = require('./routes')

require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true })

requireDir('./models')

app.use('/api', routes)

const server = app.listen(process.env.PORT)

module.exports = server
