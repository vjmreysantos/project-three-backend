import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 240 },
    rating: { type: Number, min: 1, max: 5 },
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  },
  {
    timestamps: true,
  }
)

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