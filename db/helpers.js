import mongoose  from 'mongoose'
import { dbURI } from '../config/environment.js'

export const connectToDatabase = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
  return mongoose.connect(dbURI, options)
}