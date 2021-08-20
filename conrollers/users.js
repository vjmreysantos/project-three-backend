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

async function userShow (req, res, next) {
  const { userId } = req.params
  try {
    const foundUser = await User.findById(userId)
    if (!foundUser) throw new Error()
    return res.status(200).json(foundUser)
  } catch (err) {
    next(err)
  }
}

async function userEdit(req, res, next) {
  const { userId } = req.params
  try {
    const userToUpdate = await User.findById(userId)
    if (!userToUpdate) {
      throw new Error()
    }
    Object.assign(userToUpdate, req.body)
    await userToUpdate.save()
    return res.status(202).json(userToUpdate)
  } catch (err) {
    next(err)
  }
}

async function userDelete(req, res, next) {
  const { userId } = req.params
  try {
    const userToDelete = await User.findById(userId)
    if (!userToDelete) {
      throw new Error()
    }
    await userToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export default {
  userIndex: userIndex,
  createUser: createUser,
  showUser: userShow,
  editUser: userEdit,
  deleteUser: userDelete,
}