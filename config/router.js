import express from 'express'
import users from '../conrollers/users.js'

const router = express.Router()

router.route('/users')
  .get(users.userIndex)
  .post(users.createUser)

router.route('/users/:userId')
  .get(users.showUser)
  .put(users.editUser)
  .delete(users.deleteUser)

export default router