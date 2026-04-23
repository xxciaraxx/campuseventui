// components/Navbar.jsx
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AppContext'

function Navbar() {
  const { isLoggedIn, logout } = useAuth()

  return (
    <nav>
      <Link to="/" className="nav-brand">
        <span className="nav-dot" />
        CampusEvent<span style={{ color: 'var(--accent)' }}>UI</span>
      </Link>
      <Link to="/">Home</Link>
      <Link to="/events">Events</Link>
      <Link to="/dashboard">Dashboard</Link>
      {isLoggedIn ? (
        <button className="nav-logout" onClick={logout}>Logout</button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </nav>
  )
}

export default Navbar
