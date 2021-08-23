import OnlineEvent from '../models/onlineEvent.js'
import { NotFound, Unauthorized } from '../lib/errors.js'

async function createOnlineEvent(req, res, next) {
  const { currentUser } = req
  try {
    const newOnlineEvent = await OnlineEvent.create({ ...req.body, addedBy: currentUser })
    return res.status(201).json(newOnlineEvent)
  } catch (err) {
    next(err)
  }
}

async function onlineEventIndex(req, res, next) {
  try {
    const onlineEvents = await OnlineEvent.find()
    return res.status(200).json(onlineEvents)
  } catch (err) {
    next(err)
  }
}

async function onlineEventShow (req, res, next) {
  const { onlineEventId } = req.params
  try {
    const foundOnlineEvent = await OnlineEvent.findById(onlineEventId)
      .populate('addedBy')
      .populate('comments.addedBy')
    if (!foundOnlineEvent) throw new NotFound()
    return res.status(200).json(foundOnlineEvent)
  } catch (err) {
    next(err)
  }
}

async function onlineEventEdit(req, res, next) {
  const { onlineEventId } = req.params
  const { currentUserId } = req
  try {
    const onlineEventToUpdate = await OnlineEvent.findById(onlineEventId)
    if (!onlineEventToUpdate) {
      throw new NotFound()
    }
    if (!onlineEventToUpdate.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }
    Object.assign(onlineEventToUpdate, req.body)
    await onlineEventToUpdate.save()
    return res.status(202).json(onlineEventToUpdate)
  } catch (err) {
    next(err)
  }
}

async function onlineEventDelete(req, res, next) {
  const { onlineEventId } = req.params
  const { currentUserId } = req
  try {
    const onlineEventToDelete = await OnlineEvent.findById(onlineEventId)
    if (!onlineEventToDelete) {
      throw new NotFound()
    }
    if (!onlineEventToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }
    await onlineEventToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function createOnlineEventComment(req, res, next) {
  const { onlineEventId } = req.params
  const { currentUser } = req
  try {
    const commentedOnlineEvent = await OnlineEvent.findById(onlineEventId)
    if (!commentedOnlineEvent) {
      throw new NotFound()
    }
    const createdComment = commentedOnlineEvent.comments.create({ ...req.body, addedBy: currentUser })
    commentedOnlineEvent.comments.push(createdComment)
    await commentedOnlineEvent.save()
    return res.status(201).json(commentedOnlineEvent)
  } catch (err) {
    next(err)
  }
}

async function deleteOnlineEventComment(req, res, next) {
  const { onlineEventId, commentId } = req.params
  const { currentUserId } = req
  try {
    const onlineEvent = await OnlineEvent.findById(onlineEventId)
    if (!onlineEvent) {
      throw new NotFound()
    }
    const commentToDelete = onlineEvent.comments.id(commentId)
    if (!commentToDelete) {
      throw new NotFound()
    }
    if (!commentToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }
    commentToDelete.remove()
    await onlineEvent.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function attendOnlineEvent(req, res, next) {
  const { onlineEventId } = req.params
  const { currentUserId, currentUser } = req
  try {
    const onlineEventToAttend = await OnlineEvent.findById(onlineEventId).populate('attendees')

    if (!onlineEventToAttend) {
      throw new NotFound()
    }

    if (onlineEventToAttend.attendees.find(user => currentUserId.equals(user._id))) {
      onlineEventToAttend.attendees.remove(currentUserId)
    } else {
      onlineEventToAttend.attendees.push(currentUser)
    }

    await onlineEventToAttend.save()

    return res.status(202).json(onlineEventToAttend)
  } catch (err) {
    next(err)
  }
}



export default {
  createOnlineEvent: createOnlineEvent,
  onlineEventIndex: onlineEventIndex,
  onlineEventShow: onlineEventShow,
  onlineEventEdit: onlineEventEdit,
  onlineEventDelete: onlineEventDelete,
  createOnlineEventComment: createOnlineEventComment,
  deleteOnlineEventComment: deleteOnlineEventComment,
  attendOnlineEvent: attendOnlineEvent,
}