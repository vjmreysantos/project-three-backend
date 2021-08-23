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
    events: [{ type: mongoose.Schema.ObjectId, ref: 'Event', required: true }],
    isAdmin: { type: Boolean, default: false },
  }
)

userSchema
  .virtual('joinedEvent', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'attendees',
  })
  .get(function(joinedEvent) {
    if (!joinedEvent) return

    return joinedEvent.map(event => {
      return {
        _id: event.id,
        name: event.name,
        image: event.image,
        location: event.location,
        attendees: event.attendees,
        category: event.category,
        group: event.groups,
        addedBy: event.addedBy,
      }
    })
  })

userSchema
  .virtual('createdEvent', {
    ref: 'Event',
    localField: '_id',
    foreignField: 'addedBy',
  })

userSchema
  .virtual('joinedOnlineEvent', {
    ref: 'OnlineEvent',
    localField: '_id',
    foreignField: 'attendees',
  })
  .get(function(joinedOnlineEvent) {
    if (!joinedOnlineEvent) return

    return joinedOnlineEvent.map(onlineEvent => {
      return {
        _id: onlineEvent.id,
        name: onlineEvent.name,
        image: onlineEvent.image,
        meetingLink: onlineEvent.meetingLink,
        attendees: onlineEvent.attendees,
        category: onlineEvent.category,
        group: onlineEvent.groups,
        addedBy: onlineEvent.addedBy,
      }
    })
  })

userSchema
  .virtual('createdOnlineEvent', {
    ref: 'OnlineEvent',
    localField: '_id',
    foreignField: 'addedBy',
  })

userSchema
  .virtual('joinedGroup', {
    ref: 'Group',
    localField: '_id',
    foreignField: 'members',
  })
  .get(function(joinedGroup) {
    if (!joinedGroup) return

    return joinedGroup.map(group => {
      return {
        _id: group.id,
        name: group.name,
        image: group.image,
        events: group.events,
        location: group.location,
        members: group.members,
        category: group.category,
      }
    })
  })

userSchema
  .virtual('createdGroup', {
    ref: 'Group',
    localField: '_id',
    foreignField: 'addedBy',
  })

userSchema.set('toJSON', 
  {
    virtuals: true,
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
    if (this.isModified('password') && this.password !== this._passwordConfirmation) {
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