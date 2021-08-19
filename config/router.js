import express from 'express'
import users from '../conrollers/users.js'

const router = express.Router()

router.route('/users')
  .get(users.userIndex)
  .post(users.createUser)

  export default router