import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function EventResults() {
  const { eventId } = useParams()
  const [event, setEvent] = useState(null)
  const [rsvps, setRsvps] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:4000/api/events/${eventId}`)
      .then(result => setEvent(result.data))
      .catch(() => setError('Event not found.'))

    axios.get(`http://localhost:4000/api/rsvps/event/${eventId}`)
      .then(result => setRsvps(result.data))
      .catch(() => setError('Could not load RSVPs.'))
  }, [eventId])

  if (error) {
    return <p>{error}</p>
  }

  if (!event) {
    return <p>Loading...</p>
  }

  const yesCount = rsvps.filter(rsvp => rsvp.response === 'yes').length
  const noCount = rsvps.filter(rsvp => rsvp.response === 'no').length
  const maybeCount = rsvps.filter(rsvp => rsvp.response === 'maybe').length

  const rsvpLink = `${window.location.origin}/event/${eventId}/rsvp`

  return (
    <div>
      <h1>{event.title}</h1>
      <p>{new Date(event.date).toLocaleDateString()} — {event.location}</p>
      {event.description && <p>{event.description}</p>}

      <div className="alert alert-info">
        Share this link with guests: <br />
        <code>{rsvpLink}</code>
      </div>

      <h3>Responses</h3>
      <p>
        <strong>{yesCount}</strong> Yes &nbsp;
        <strong>{noCount}</strong> No &nbsp;
        <strong>{maybeCount}</strong> Maybe
      </p>

      {rsvps.length === 0 ? (
        <p>No RSVPs yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Response</th>
            </tr>
          </thead>
          <tbody>
            {rsvps.map(rsvp => (
              <tr key={rsvp._id}>
                <td>{rsvp.name}</td>
                <td>{rsvp.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default EventResults