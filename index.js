import express from 'express'

import { port } from './config/environment.js'
import { connectToDatabase } from './db/helpers.js'
import router from './config/router.js'

const app = express()

app.use(express.json())
app.use('/', router)

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

