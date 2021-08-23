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

const onlineEventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true,  maxlength: 500 },
    category: [{ type: String, required: true }],
    date: { type: Date, required: true },
    meetingLink: { type: String, required: true },
    attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group' }],
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    comments: [ commentSchema ],
  }
)

const OnlineEvent = mongoose.model('onlineEvent', onlineEventSchema)

export default OnlineEvent