import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function RsvpForm() {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [response, setResponse] = useState('yes')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() =>{
    axios.get(`http://localhost:4000/api/events/${eventId}`)
    .then(result => setEvent(result.data))
    .catch(() => setError('Event not found.'))
  }, [eventId])

  const handleSubmit = async(submitEvent) => {
    submitEvent.preventDefault()
    setError(null)

    try{
      await axios.post('http://localhost:4000/api/rsvps', {
        event: eventId,
        name,
        email,
        response 
      })
      setSubmitted(true)
    } catch(error) {
      setError(error.response.data.error)
    }
  }
  if(error && !event) {
    return <p>{error}</p>
  }

  if(!event) {
    return <p>Loading...</p>
  }

  if(submitted) {
    return <h2>Thanks for your RSVP!</h2>
  }

  return(
    <div>
      <h1>{event.title}</h1>
      <p>{new Date(event.date).toLocaleDateString()} - {event.location}</p>
      {event.description && <p>{event.description}</p>}

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Your Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Your Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Are you coming?</label>
          <select
            className="form-select"
            value={response}
            onChange={(event) => setResponse(event.target.value)}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
            <option value="maybe">Maybe</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit RSVP
        </button>
      </form>
    </div>
  )
}

export default RsvpForm