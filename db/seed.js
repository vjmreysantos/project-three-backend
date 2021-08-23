
import Event from '../models/event.js'
import eventData from './data/events.js'
import User from '../models/user.js'
import userData from './data/users.js'
import { connectToDatabase, truncateDatabase, disconnectDatabase } from './helpers.js'

async function seed() {
  try {
    await connectToDatabase()
    console.log('Database Connected')

    await truncateDatabase()
    console.log('Database Dropped')
    
    const user = await User.create(userData)
    console.log(`${user.length} User added to the database`)

    const event = await Event.create(eventData)
    console.log(`${event.length} Event added to the database`)

    console.log('Goodby')
  } catch (err) {
    console.log('something went wrong')
    console.log(err)
  }
  await disconnectDatabase()
}

seed()