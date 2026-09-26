import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function CreateEvent() {
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async(event) => {
    event.preventDefault()

    try{
      const response = await axios.post('http://localhost:4000/api/events', {
        title,
        date,
        location,
        description
      })

      const newEvent = response.data

      const myEvents = JSON.parse(localStorage.getItem('myEvents') || '[]')
      myEvents.push({
          id: newEvent._id,
          title: newEvent.title,
          date: newEvent.date,
          hostKey: newEvent.hostKey
      })
      localStorage.setItem('myEvents', JSON.stringify(myEvents))
      
      navigate(`/event/${newEvent._id}/results?key=${newEvent.hostKey}`)
    } catch(error) {
      console.log(error)
      alert('Something went wrong creating the event.')
    }
  }

  return(
    <div className="card shadow-sm">
      <div className="card-body">
      <h2 className="card-title mb-4">Create an Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Description (optional)</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Event
        </button>
      </form>
      </div>
    </div>
  )
}

export default CreateEvent