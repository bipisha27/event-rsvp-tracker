require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const eventsRouter = require('./routes/events')
const rsvpsRouter = require('./routes/rsvps')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/ping', (req, res) => {
  res.send('pong')
})

app.use('/api/events', eventsRouter)
app.use('/api/rsvps', rsvpsRouter)

const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })