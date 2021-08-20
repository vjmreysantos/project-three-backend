import Event from '../models/event.js'

async function createEvent(req, res, next) {
  try {
    const newEvent = await Event.create(req.body)
    return res.status(201).json(newEvent)
  } catch (err) {
    console.log(err)
  }
}

async function eventIndex(req, res, next) {
  try {
    const events = await Event.find()
    return res.status(200).json(events)
  } catch (err) {
    console.log(err)
  }
}

async function eventShow (req, res, next) {
  const { eventId } = req.params
  try {
    const foundEvent = await Event.findById(eventId)
    if (!foundEvent) throw new Error()
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
      throw new Error()
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
      throw new Error()
    }
    await eventToDelete.remove()
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
}