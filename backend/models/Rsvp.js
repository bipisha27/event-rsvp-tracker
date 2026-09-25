const mongoose = require('mongoose')

const rsvpSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  name:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  response: {
    type: String,
    enum: ['yes', 'no', 'maybe'],
    required: true
  }
})

const Rsvp = mongoose.model('Rsvp', rsvpSchema)

module.exports = Rsvp 
