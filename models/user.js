import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'

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

userSchema.set('toJSON', 
  {
    transform(_doc, json) {
      delete json.password
      return json
    },
  }
)

userSchema
  .virtual('passwordConfirmation')
  .set(function (passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation
  })

userSchema
  .pre('validate', function(next) {
    if (this.isModified('password') && this.password !== this.passwordConfirmation) {
      this.invalidate('passwordConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('User', userSchema)

export default User