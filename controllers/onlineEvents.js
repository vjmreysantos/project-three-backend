import OnlineEvent from '../models/onlineEvent.js'
import { NotFound } from '../lib/errors.js'

async function createOnlineEvent(req, res, next) {
  try {
    const newOnlineEvent = await OnlineEvent.create(req.body)
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
    if (!foundOnlineEvent) throw new NotFound()
    return res.status(200).json(foundOnlineEvent)
  } catch (err) {
    next(err)
  }
}

async function onlineEventEdit(req, res, next) {
  const { onlineEventId } = req.params
  try {
    const onlineEventToUpdate = await OnlineEvent.findById(onlineEventId)
    if (!onlineEventToUpdate) {
      throw new NotFound()
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
  try {
    const onlineEventToDelete = await OnlineEvent.findById(onlineEventId)
    if (!onlineEventToDelete) {
      throw new NotFound()
    }
    await onlineEventToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function createOnlineEventComment(req, res, next) {
  const { onlineEventId } = req.params
  try {
    const commentedOnlineEvent = await OnlineEvent.findById(onlineEventId)
    if (!commentedOnlineEvent) {
      throw new NotFound()
    }
    console.log(commentedOnlineEvent)
    commentedOnlineEvent.comments.push(req.body)
    await commentedOnlineEvent.save()
    return res.status(201).json(commentedOnlineEvent)
  } catch (err) {
    next(err)
  }
}

async function deleteOnlineEventComment(req, res, next) {
  const { onlineEventId, commentId } = req.params
  try {
    const onlineEvent = await OnlineEvent.findById(onlineEventId)
    if (!onlineEvent) {
      throw new NotFound()
    }
    const commentToDelete = onlineEvent.comments.id(commentId)
    if (!commentToDelete) {
      throw new NotFound()
    }
    commentToDelete.remove()
    await onlineEvent.save()
    return res.sendStatus(204)
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
  
}