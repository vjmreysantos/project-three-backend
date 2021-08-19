import User from '../models/user.js'

async function createUser(req, res, next) {
  try {
    const newUser = await User.create(req.body)
    return res.status(201).json(newUser)
  } catch (err) {
    console.log(err)
  }
}

async function userIndex(req, res, next) {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (err) {
    console.log(err)
  }
}

export default {
  userIndex: userIndex,
  createUser: createUser,
}