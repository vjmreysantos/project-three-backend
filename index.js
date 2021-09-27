import express from 'express'
import cors from 'cors'
import { port } from './config/environment.js'
import { connectToDatabase } from './db/helpers.js'
import router from './config/router.js'
import logger from './lib/logger.js'
import errorHandler from './lib/errorHandler.js'

const app = express()

app.use(express.json())
app.use(cors())
app.use(logger)
app.use('/api', router)
app.use(errorHandler)


async function startServer() {
  try {
    await connectToDatabase()
    console.log('Database Connected')
    app.listen(port, () => {
      console.log(`🤖 app is listening on port ${port}`)
    })
  } catch (err) {
    console.log('Something went wrong')
    console.log(err)
  }
}
startServer()

