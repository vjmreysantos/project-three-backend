import Group from '../models/group.js'
import { NotFound, Unauthorized } from '../lib/errors.js'

async function createGroup(req, res, next) {
  const { currentUser } = req
  try {
    const newGroup = await Group.create({ ...req.body, addedBy: currentUser })
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
  const { currentUserId } = req
  try {
    const groupToUpdate = await Group.findById(groupId)
    if (!groupToUpdate) {
      throw new NotFound()
    }
    if (!groupToUpdate.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
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
  const { currentUserId } = req
  try {
    const groupToDelete = await Group.findById(groupId)
    if (!groupToDelete) {
      throw new NotFound()
    }
    if (!groupToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }
    await groupToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function createGroupComment(req, res, next) {
  const { groupId } = req.params
  const { currentUser } = req
  try {
    const commentedGroup = await Group.findById(groupId)
    if (!commentedGroup) {
      throw new NotFound()
    }
    const createdComment = commentedGroup.comments.create({ ...req.body, addedBy: currentUser })
    commentedGroup.comments.push(createdComment)
    await commentedGroup.save()
    return res.status(201).json(commentedGroup)
  } catch (err) {
    next(err)
  }
}

async function deleteGroupComment(req, res, next) {
  const { groupId, commentId } = req.params
  const { currentUserId } = req
  try {
    const group = await Group.findById(groupId)
    if (!group) {
      throw new NotFound()
    }
    const commentToDelete = group.comments.id(commentId)
    if (!commentToDelete) {
      throw new NotFound()
    }
    if (!commentToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }
    commentToDelete.remove()
    await group.save()
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
  createGroupComment: createGroupComment,
  deleteGroupComment: deleteGroupComment,
}