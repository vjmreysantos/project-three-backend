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

router.route('/profile')
  .get(secureRoute, auth.userProfile)


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
  .delete(secureRoute, groups.deleteGroupComment)

router.route('/groups/:groupId/create-comment')
  .post(secureRoute, groups.createGroupComment)

// REQUESTS FOR EVENTS

router.route('/events')
  .get(events.eventIndex)

router.route('/events/new-event')
  .post(secureRoute, events.createEvent)

router.route('/events/:eventId')  
  .get(events.eventShow)
  .put(secureRoute, events.eventEdit)
  .delete(secureRoute, events.eventDelete)
  .post(secureRoute, events.attendEvent)

router.route('/events/:eventId/create-comment')
  .post(secureRoute, events.createEventComment)
  
router.route('/events/:eventId/:commentId')
  .delete(secureRoute, events.deleteEventComment)


// REQUESTS FOR ONLINE EVENTS

router.route('/online-events')
  .get(onlineEvents.onlineEventIndex)

router.route('/online-events/new-online-event')  
  .post(secureRoute, onlineEvents.createOnlineEvent)

router.route('/online-events/:onlineEventId')
  .get(onlineEvents.onlineEventShow)
  .put(secureRoute, onlineEvents.onlineEventEdit)
  .delete(secureRoute, onlineEvents.onlineEventDelete)
  .post(secureRoute, onlineEvents.attendOnlineEvent)

router.route('/online-events/:onlineEventId/create-comment')
  .post(secureRoute, onlineEvents.createOnlineEventComment)
  

router.route('/online-events/:onlineEventId/:commentId')
  .delete(secureRoute, onlineEvents.deleteOnlineEventComment)

export default router