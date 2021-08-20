import mongoose from 'mongoose'

const detailsSchema = new mongoose.Schema(
  {
    patronus: { type: String },
    wand: { type: String },
    friends: [{ type: String }],
    foes: [{ type: String }],
    animagus: { type: String },
    pet: { type: String },
    favoriteSubject: { type: String },
    quidditchTeam: { type: String },
    favoriteSweet: { type: String },
  }
)

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    house: { type: String, required: true },
    details: { detailsSchema },
    groups: [{}],
    events: [{}],
    isAdmin: { type: Boolean, default: false },
  }
)

const User = mongoose.model('User', userSchema)

export default User