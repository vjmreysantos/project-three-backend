import mongoose from 'mongoose'
import Comments from './comment'

const onlineEventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true,  maxlength: 500 },
    category: [{ type: String, required: true }],
    date: { type: Date, required: true },
    meetingLink: { type: String, required: true },
    attendees: [{}],
    groups: [{}],
    createdBy: {},
    comments: [{ Comments }],
  }
)

const OnlineEvent = mongoose.model('onlineEvent', onlineEventSchema)

export default OnlineEvent