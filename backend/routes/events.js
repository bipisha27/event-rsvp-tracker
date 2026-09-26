const express = require('express')
const router = express.Router()
const Event = require('../models/Event')
const crypto = require('crypto')

router.post('/', async (req, res) => {
  try {
    const hostKey = crypto.randomBytes(16).toString('hex')

    const event = new Event({
      ...req.body,
      hostKey
  })
    const savedEvent = await event.save()
    res.status(201).json(savedEvent)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

router.get('/:id', async (req, res) => {
  try{
    const event = await Event.findById(req.params.id)
    if(!event) {
      return res.status(404).json({error: 'Event not found.'})
    }

    const { hostKey, ...eventWithoutKey } = event.toObject()

    res.json(eventWithoutKey)
  } catch(error){
    res.status(400).json({error: error.message})
  }
})

router.get('/:id/host', async(req, res) => {
  try {
    const event = await Event.findById(req.params.id)

    if(!event) {
      return res.status(404).json({error: 'Event not found.'})
    }

    const providedKey = req.query.key 

    if(providedKey !== event.hostKey) {
      return res.status(403).json({error: 'Invalid host key.'})
    }

    res.json(event)
  } catch(error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router 