import mongoose from 'mongoose'
import express from 'express'
import routes from '../src/routes.js'
import cors from 'cors'
import * as dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })

app.use('/api', routes)

app.listen(process.env.PORT)

export default app
