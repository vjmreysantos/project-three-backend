import mongoose from 'mongoose'
import Comments from './comment.js'

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    category: [{ type: String, required: true }],
    members: [{ type: mongoose.Schema.ObjectId, ref: 'User', required: true }],
    events: [{ type: mongoose.Schema.ObjectId, ref: 'Event', required: true }],
    location: { type: String },
    comments: [{ Comments }],
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  }
)

const Group = mongoose.model('Group', groupSchema)

export default Group