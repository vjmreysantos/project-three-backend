import mongoose from 'mongoose'
import Comments from './comment.js'

const groupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: String, required: true },
    description: { type: String, required: true, maxlength: 500 },
    category: [{ type: String, required: true }],
    members: [{}],
    events: [{}],
    location: { type: String },
    comments: [{ Comments }],
    addedBy: [{}],
  }
)

const Group = mongoose.model('Group', groupSchema)

export default Group