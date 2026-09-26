import { Link } from "react-router-dom"

function Layout({ children }) {
  return(
    <div>
      <nav className="navbar navbar-dark app-navbar mb-4">
      <div className="container d-flex justify-content-between align-items-center">
        <span className="navbar-brand mb-0 h1">📅 Event RSVP Tracker</span>
        <Link to="/my-events" className="text-white text-decoration-none">
          My Events
        </Link>
      </div>
</nav>
      <div className="container" style={{maxWidth: '700px'}}>
        {children}
      </div>
    </div>
  )
}

export default Layout 