import mongoose from 'mongoose'
import commentSchema from './comment.js'

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    category: [{ type: String, required: true }],
    members: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    events: [{ type: mongoose.Schema.ObjectId, ref: 'Event' }],
    location: { type: String },
    comments: [ commentSchema ],
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  }
)

const Group = mongoose.model('Group', groupSchema)

export default Group