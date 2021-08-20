import mongoose from 'mongoose'
import commentSchema from './comment.js'

const locationSchema = new mongoose.Schema(
  {
    streetNumber: { type: Number, required: true },
    streetName: { type: String, required: true },
    postcode: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  }
)

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true,  maxlength: 500 },
    category: [{ type: String, required: true }],
    date: { type: Date, required: true },
    location: { locationSchema, required: true },
    attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
    groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group', required: true }],
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    comments: [ commentSchema ],
  }
)

const Event = mongoose.model('Event', eventSchema)

export default Event