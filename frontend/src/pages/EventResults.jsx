import { useState, useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'

function EventResults() {
  const { eventId } = useParams()

  const [ searchParams ] = useSearchParams()
  const hostKey = searchParams.get('key')

  const [event, setEvent] = useState(null)
  const [rsvps, setRsvps] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    axios.get(`http://localhost:4000/api/events/${eventId}/host?key=${hostKey}`)
      .then(result => setEvent(result.data))
      .catch(() => setError('Invalid or missing host key.'))

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
  <div className="card shadow-sm">
    <div className="event-hero">
      <h1>{event.title}</h1>
      <p>📅 {new Date(event.date).toLocaleDateString()} &nbsp; 📍 {event.location}</p>
    </div>
    <div className="card-body">
      {event.description && <p className="event-tagline">{event.description}</p>}

      <div className="invite-box mb-4">
        Share this link with guests: <br />
        <code>{rsvpLink}</code>
      </div>

      <h3>Responses</h3>
      <div className="row g-2 mb-4">
        <div className="col-4">
          <div className="stat-card yes">
            <div style={{ fontSize: '22px', fontWeight: 500 }}>{yesCount}</div>
            <div style={{ fontSize: '13px' }}>Yes</div>
          </div>
        </div>
        <div className="col-4">
          <div className="stat-card no">
            <div style={{ fontSize: '22px', fontWeight: 500 }}>{noCount}</div>
            <div style={{ fontSize: '13px' }}>No</div>
          </div>
        </div>
        <div className="col-4">
          <div className="stat-card maybe">
            <div style={{ fontSize: '22px', fontWeight: 500 }}>{maybeCount}</div>
            <div style={{ fontSize: '13px' }}>Maybe</div>
          </div>
        </div>
      </div>

      {rsvps.length === 0 ? (
        <p>No RSVPs yet.</p>
      ) : (
        <table className="table rsvp-table">
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
                <td>
                  <span className={`badge-${rsvp.response} px-2 py-1 rounded-pill`}>
                    {rsvp.response}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </div>
)
}

export default EventResults