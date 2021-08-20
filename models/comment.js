import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 240 },
    rating: { type: Number, min: 1, max: 5 },
    addedBy: [{}],
  },
  {
    timestamps: true,
  }
)

const Comments = mongoose.model('Comments', commentSchema)

export default Comments