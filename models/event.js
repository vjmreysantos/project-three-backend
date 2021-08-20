import mongoose from 'mongoose'
import Comments from './comment'

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
    attendees: [{}],
    groups: [{}],
    createdBy: {},
    comments: [{ Comments }],
  }
)

const Event = mongoose.model('Event', eventSchema)

export default Event