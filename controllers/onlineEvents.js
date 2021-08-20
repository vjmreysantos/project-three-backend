import OnlineEvent from '../models/onlineEvent.js'

async function createOnlineEvent(req, res, next) {
  try {
    const newOnlineEvent = await OnlineEvent.create(req.body)
    return res.status(201).json(newOnlineEvent)
  } catch (err) {
    console.log(err)
  }
}

async function onlineEventIndex(req, res, next) {
  try {
    const onlineEvents = await OnlineEvent.find()
    return res.status(200).json(onlineEvents)
  } catch (err) {
    console.log(err)
  }
}

async function onlineEventShow (req, res, next) {
  const { onlineEventId } = req.params
  try {
    const foundOnlineEvent = await OnlineEvent.findById(onlineEventId)
    if (!foundOnlineEvent) throw new Error()
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
      throw new Error()
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
      throw new Error()
    }
    await onlineEventToDelete.remove()
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
}