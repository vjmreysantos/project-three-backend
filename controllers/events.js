import Event from '../models/event.js'
import { NotFound } from '../lib/errors.js'

async function createEvent(req, res, next) {
  try {
    const newEvent = await Event.create(req.body)
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
  try {
    const eventToUpdate = await Event.findById(eventId)
    if (!eventToUpdate) {
      throw new NotFound()
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
  try {
    const eventToDelete = await Event.findById(eventId)
    if (!eventToDelete) {
      throw new NotFound()
    }
    await eventToDelete.remove()
    return res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}


async function createEventComment(req, res, next) {
  const { eventId } = req.params
  try {
    const commentedEvent = await Event.findById(eventId)
    if (!commentedEvent) {
      throw new NotFound()
    }
    console.log(commentedEvent)
    commentedEvent.comments.push(req.body)
    await commentedEvent.save()
    return res.status(201).json(commentedEvent)
  } catch (err) {
    next(err)
  }
}

async function deleteEventComment(req, res, next) {
  const { eventId, commentId } = req.params
  try {
    const event = await Event.findById(eventId)
    if (!event) {
      throw new NotFound()
    }
    const commentToDelete = event.comments.id(commentId)
    if (!commentToDelete) {
      throw new NotFound()
    }
    commentToDelete.remove()
    await event.save()
    return res.sendStatus(204)
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
}