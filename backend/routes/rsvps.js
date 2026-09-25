const express = require('express')
const router = express.Router()
const Rsvp = require('../models/Rsvp')

router.post('/', async(req, res) => {
  try {
    const {event, name, email, response} = req.body

    const existing = await Rsvp.findOne({event, email})
    if(existing) {
      return res.status(400).json({error: 'You have already RSVP\'d to this event.'})
    }

    const rsvp = new Rsvp({event, name, email, response})
    const savedRsvp = await rsvp.save()
    res.status(201).json(savedRsvp)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
})

router.get('/event/:eventId', async(req, res) => {
  try{
    const rsvps = await Rsvp.find({event: req.params.eventId})
    res.json(rsvps)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router 