import mongoose  from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const dbURI = process.env.DB_URI

export const connectToDatabase = () => {
  const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
  return mongoose.connect(dbURI, options)
}