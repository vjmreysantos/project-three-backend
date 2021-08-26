
import Event from '../models/event.js'
import eventData from './data/events.js'
import User from '../models/user.js'
import userData from './data/users.js'
import Group from '../models/group.js'
import groupData from './data/groups.js'
import OnlineEvent from '../models/onlineEvent.js'
import onlineEventData from './data/onlineEvents.js'
import { connectToDatabase, truncateDatabase, disconnectDatabase } from './helpers.js'

async function seed() {
  try {
    await connectToDatabase()
    console.log('Database Connected')

    await truncateDatabase()
    console.log('Database Dropped')

    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@email.com',
      password: 'admin',
      passwordConfirmation: 'admin',
      avatar: 'https://t3.ftcdn.net/jpg/01/89/89/72/360_F_189897283_h5JyxhL6OyiQ71MIfzGVN0VJPIw0g4fE.jpg',
      house: 'Gryffindor',
      isAdmin: true,
    })

    console.log('🤖 Admin user created')

    eventData.forEach(event => {
      event.addedBy = adminUser
    })

    onlineEventData.forEach(onlineEvent => {
      onlineEvent.addedBy = adminUser
    })

    groupData.forEach(group => {
      group.addedBy = adminUser
    })
    
    const user = await User.create(userData)
    console.log(`${user.length} User added to the database`)

  
    eventData.forEach(event => {
      console.log('adding users to events')
      event.attendees = user.map(user => {
        return user.id
      })
    })    

    const event = await Event.create(eventData)
    console.log(`${event.length} Event added to the database`)

    groupData.forEach(group => {
      console.log('adding users to groups')
      group.members = user.map(user => {
        return user.id
      })
    })

    const group = await Group.create(groupData)
    console.log(`${group.length} Group added to the database`)

    onlineEventData.forEach(onlineEvent => {
      console.log('addings users to online events')
      onlineEvent.attendees = user.map(user => {
        return user.id
      })
    })

    const onlineEvent = await OnlineEvent.create(onlineEventData)
    console.log(`${onlineEvent.length} Online Event added to the database`)

    console.log('Goodbye')
  } catch (err) {
    console.log('something went wrong')
    console.log(err)
  }
  await disconnectDatabase()
}

seed()