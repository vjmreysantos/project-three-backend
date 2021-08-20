import express from 'express'
import users from '../controllers/users.js'
import groups from '../controllers/groups.js'
import events from '../controllers/events.js'
import onlineEvents from '../controllers/onlineEvents.js'
// import comments from '../controllers/comments.js'

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
  // .post(comments.createComment)

// REQUESTS FOR EVENTS

router.route('/events')
  .post(events.createEvent)
  .get(events.eventIndex)

router.route('/events/:eventId')  
  .get(events.eventShow)
  .put(events.eventEdit)
  .delete(events.eventDelete)
  // .post(comments.createComment)

// REQUESTS FOR ONLINE EVENTS

router.route('/online-events')
  .post(onlineEvents.createOnlineEvent)
  .get(onlineEvents.onlineEventIndex)

router.route('/online-events/:onlineEventId')
  .get(onlineEvents.onlineEventShow)
  .put(onlineEvents.onlineEventEdit)
  .delete(onlineEvents.onlineEventDelete)
  // .post(comments.createComment)



export default router