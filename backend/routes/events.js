const express = require('express')
const router = express.Router()
const Event = require('../models/Event')

router.post('/', async (req, res) => {
  try {
    const event = new Event(req.body)
    const savedEvent = await event.save()
    res.status(201).json(savedEvent)
  } catch (error) {
    res.status(400).json({error: error.message})
  }
})

module.exports = router 