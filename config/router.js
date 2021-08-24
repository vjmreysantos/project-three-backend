import express from 'express'
import users from '../controllers/users.js'
import groups from '../controllers/groups.js'
import events from '../controllers/events.js'
import onlineEvents from '../controllers/onlineEvents.js'
import auth from '../controllers/auth.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

// REQUESTS FOR USERS

router.route('/users')
  .get(users.userIndex)
  .post(secureRoute, users.createUser)

router.route('/users/:userId')
  .get(users.showUser)
  .put(secureRoute, users.editUser)
  .delete(secureRoute, users.deleteUser)

router.route('/register')
  .post(auth.registerUser)

router.route('/login')
  .post(auth.loginUser)



// REQUESTS FOR GROUPS

router.route('/groups')
  .get(groups.groupIndex)

router.route('/groups/new-group') 
  .post(secureRoute, groups.createGroup) 

router.route('/groups/:groupId')
  .get(groups.groupShow)
  .put(secureRoute, groups.groupEdit)
  .delete(secureRoute, groups.groupDelete)
  .post(secureRoute, groups.joinGroup)
  .post(secureRoute, groups.createGroupComment)

router.route('/groups/:groupId/:commentId')
  .delete(secureRoute, groups.deleteGroupComment)

// REQUESTS FOR EVENTS

router.route('/events')
  .post(secureRoute, events.createEvent)
  .get(events.eventIndex)

router.route('/events/:eventId')  
  .get(events.eventShow)
  .put(secureRoute, events.eventEdit)
  .delete(secureRoute, events.eventDelete)
  .post(secureRoute, events.attendEvent)
  .post(secureRoute, events.createEventComment)

router.route('/events/:eventId/:commentId')
  .delete(secureRoute, events.deleteEventComment)

// REQUESTS FOR ONLINE EVENTS

router.route('/online-events')
  .post(secureRoute, onlineEvents.createOnlineEvent)
  .get(onlineEvents.onlineEventIndex)

router.route('/online-events/:onlineEventId')
  .get(onlineEvents.onlineEventShow)
  .put(secureRoute, onlineEvents.onlineEventEdit)
  .delete(secureRoute, onlineEvents.onlineEventDelete)
  .post(secureRoute, onlineEvents.attendOnlineEvent)
  .post(secureRoute, onlineEvents.createOnlineEventComment)
  

router.route('/online-events/:onlineEventId/:commentId')
  .delete(secureRoute, onlineEvents.deleteOnlineEventComment)

export default router