import routes from '../src/routes.js'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'
import express from 'express'
import cors from 'cors'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

app.use('/api', routes)

app.listen(process.env.PORT)

export default app
