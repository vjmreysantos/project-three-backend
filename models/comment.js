import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema(
  {
    text: { type: String, required: true, maxlength: 240 },
    rating: { type: Number, min: 1, max: 5 },
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
)

// const Comments = mongoose.model('Comments', commentSchema)

export default commentSchema