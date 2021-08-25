import Event from '../models/event.js'
import { NotFound, Unauthorized } from '../lib/errors.js'

async function createEvent(req, res, next) {
  const { currentUser } = req
  try {
    const newEvent = await Event.create({ ...req.body, addedBy: currentUser })
    return res.status(201).json(newEvent)
  } catch (err) {
    next(err)
  }
}

async function eventIndex(req, res, next) {
  try {
    const events = await Event.find()
    return res.status(200).json(events)
  } catch (err) {
    next(err)
  }
}

async function eventShow (req, res, next) {
  const { eventId } = req.params
  try {
    const foundEvent = await Event.findById(eventId)
      .populate('addedBy')
      .populate('comments.addedBy')
      .populate('attendees')
    if (!foundEvent) {
      throw new NotFound()
    }
    return res.status(200).json(foundEvent)
  } catch (err) {
    next(err)
  }
}

async function eventEdit(req, res, next) {
  const { eventId } = req.params
  const { currentUserId } = req
  try {
    const eventToUpdate = await Event.findById(eventId)
    if (!eventToUpdate) {
      throw new NotFound()
    }
    if (!eventToUpdate.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }
    Object.assign(eventToUpdate, req.body)
    await eventToUpdate.save()
    return res.status(202).json(eventToUpdate)
  } catch (err) {
    next(err)
  }
}

async function eventDelete(req, res, next) {
  const { eventId } = req.params
  const { currentUserId } = req
  try {
    const eventToDelete = await Event.findById(eventId)
    if (!eventToDelete) {
      throw new NotFound()
    }
    if (!eventToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }
    await eventToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


async function createEventComment(req, res, next) {
  const { eventId } = req.params
  const { currentUser } = req
  try {
    const commentedEvent = await Event.findById(eventId)
    if (!commentedEvent) {
      throw new NotFound()
    }
    const createdComment = commentedEvent.comments.create({ ...req.body, addedBy: currentUser })
    commentedEvent.comments.push(createdComment)
    await commentedEvent.save()
    return res.status(201).json(commentedEvent)
  } catch (err) {
    next(err)
  }
}

async function deleteEventComment(req, res, next) {
  const { eventId, commentId } = req.params
  const { currentUserId } = req
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      throw new NotFound()
    }
    const commentToDelete = event.comments.id(commentId)
    if (!commentToDelete) {
      throw new NotFound()
    }
    if (!commentToDelete.addedBy.equals(currentUserId)) {
      throw new Unauthorized()
    }
    commentToDelete.remove()
    await event.save()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}

async function attendEvent(req, res, next) {
  const { eventId } = req.params
  const { currentUserId, currentUser } = req
  try {
    const eventToAttend = await Event.findById(eventId).populate('attendees')

    if (!eventToAttend) {
      throw new NotFound()
    }

    if (eventToAttend.attendees.find(user => currentUserId.equals(user._id))) {
      eventToAttend.attendees.remove(currentUserId)
    } else {
      eventToAttend.attendees.push(currentUser)
    }

    await eventToAttend.save()

    return res.status(202).json(eventToAttend)
  } catch (err) {
    next(err)
  }
}



export default {
  createEvent: createEvent,
  eventIndex: eventIndex,
  eventShow: eventShow,
  eventEdit: eventEdit,
  eventDelete: eventDelete,
  createEventComment: createEventComment,
  deleteEventComment: deleteEventComment,
  attendEvent: attendEvent,
}