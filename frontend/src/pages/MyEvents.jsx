import { Link } from 'react-router-dom'

function MyEvents() {
  const myEvents = JSON.parse(localStorage.getItem('myEvents') || '[]')

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">My Events</h2>

        {myEvents.length === 0 ? (
          <p>You haven't created any events on this device yet.</p>
        ) : (
          <div className="d-flex flex-column gap-2">
            {myEvents.map(event => (
              <Link
                key={event.id}
                to={`/event/${event.id}/results?key=${event.hostKey}`}
                className="text-decoration-none p-3 rounded-3"
                style={{ background: 'var(--maybe-bg)', color: '#4A1B0C' }}
              >
                <strong>{event.title}</strong>
                <br />
                <span style={{ fontSize: '13px' }}>
                  {new Date(event.date).toLocaleDateString()}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default MyEvents