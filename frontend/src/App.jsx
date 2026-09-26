import Layout from "./components/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateEvent from './pages/CreateEvent'
import RsvpForm from './pages/RsvpForm'
import EventResults from './pages/EventResults'
import MyEvents from "./pages/MyEvents";

function App() {
  return (
    <BrowserRouter>
      <div className="container mt-4">
      <Layout>
        <Routes>
          <Route path="/" element={<CreateEvent/>} />
          <Route path="/event/:eventId/rsvp" element={<RsvpForm />} />
          <Route path="/event/:eventId/results" element={<EventResults />} />
          <Route path="/my-events" element={<MyEvents />} />
        </Routes>
      </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App 