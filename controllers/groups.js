import Group from '../models/group.js'
import { NotFound } from '../lib/errors.js'

async function createGroup(req, res, next) {
  try {
    const newGroup = await Group.create(req.body)
    return res.status(201).json(newGroup)
  } catch (err) {
    next(err)
  }
}

async function groupIndex(req, res, next) {
  try {
    const groups = await Group.find()
    return res.status(200).json(groups)
  } catch (err) {
    next(err)
  }
}

async function groupShow (req, res, next) {
  const { groupId } = req.params
  try {
    const foundGroup = await Group.findById(groupId)
    if (!foundGroup) throw new NotFound()
    return res.status(200).json(foundGroup)
  } catch (err) {
    next(err)
  }
}

async function groupEdit(req, res, next) {
  const { groupId } = req.params
  try {
    const groupToUpdate = await Group.findById(groupId)
    if (!groupToUpdate) {
      throw new NotFound()
    }
    Object.assign(groupToUpdate, req.body)
    await groupToUpdate.save()
    return res.status(202).json(groupToUpdate)
  } catch (err) {
    next(err)
  }
}

async function groupDelete(req, res, next) {
  const { groupId } = req.params
  try {
    const groupToDelete = await Group.findById(groupId)
    if (!groupToDelete) {
      throw new NotFound()
    }
    await groupToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

export default {
  createGroup: createGroup,
  groupIndex: groupIndex,
  groupShow: groupShow,
  groupEdit: groupEdit,
  groupDelete: groupDelete,
}