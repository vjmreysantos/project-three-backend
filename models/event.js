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

// const locationSchema = new mongoose.Schema(
//   {
//     placeName: { type: String },
//     streetNumber: { type: Number, required: true },
//     streetName: { type: String, required: true },
//     postcode: { type: String, required: true },
//     latitude: { type: Number, required: true },
//     longitude: { type: Number, required: true },
//   }
// )

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true,  maxlength: 500 },
    category: [{ type: String, required: true }],
    date: { type: String, format: Date, required: true },
    time: { type: String, required: true },
    location: {
      placeName: { type: String },
      streetNumber: { type: Number },
      streetName: { type: String, required: true },
      postcode: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    // location: [ locationSchema ],
    attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    // groups: [{ type: mongoose.Schema.ObjectId, ref: 'Group' }],
    addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
    comments: [ commentSchema ],
  }
)

const Event = mongoose.model('Event', eventSchema)

export default Event