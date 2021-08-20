import express from 'express'
import users from '../controllers/users.js'
import groups from '../controllers/groups.js'
import events from '../controllers/events.js'

const router = express.Router()

// REQUESTS FOR USERS

router.route('/users')
  .get(users.userIndex)
  .post(users.createUser)

router.route('/users/:userId')
  .get(users.showUser)
  .put(users.editUser)
  .delete(users.deleteUser)


// REQUESTS FOR GROUPS

router.route('/groups')
  .post(groups.createGroup)
  .get(groups.groupIndex)

router.route('/groups/:groupId')
  .get(groups.groupShow)
  .put(groups.groupEdit)
  .delete(groups.groupDelete)

// REQUESTS FOR EVENTS

router.route('/events')
  .post(events.createEvent)
  .get(events.eventIndex)

router.route('/events/:eventId')  
  .get(events.eventShow)
  .put(events.eventEdit)
  .delete(events.eventDelete)


export default router