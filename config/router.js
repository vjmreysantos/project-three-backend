import express from 'express'
import users from '../controllers/users.js'
import groups from '../controllers/groups.js'

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


export default router