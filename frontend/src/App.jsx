import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEvent from './pages/CreateEvent'
import RsvpForm from './pages/RsvpForm'
import EventResults from './pages/EventResults'

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<CreateEvent/>} />
          <Route path="/event/:eventId/rsvp" element={<RsvpForm />} />
          <Route path="/event/:eventId/results" element={<EventResults />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App 