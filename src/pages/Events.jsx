import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Events() {
  const [events, setEvents]       = useState([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState(null)
  const [search, setSearch]       = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)

  const navigate = useNavigate()

  async function fetchEvents() {
    try {
      setLoading(true)
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=20')
      if (!res.ok) throw new Error('Failed to fetch events.')
      const data = await res.json()
      setEvents(data)
      setLastUpdated(new Date().toLocaleTimeString())
      setError(null)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchEvents() }, [])

  // Step 10: Auto-refresh every 30s
  useEffect(() => {
    const id = setInterval(fetchEvents, 30000)
    return () => clearInterval(id)
  }, [])

  const filtered = events.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase())
  )

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      Fetching campus events...
    </div>
  )
  if (error) return <div className="error">⚠️ {error}</div>

  return (
    <div className="page">
      <h1 className="page-title">Campus Events</h1>
      <p className="page-sub">{events.length} events found — click any card to see details</p>

      {lastUpdated && (
        <span className="last-updated">🕒 Last updated: {lastUpdated}</span>
      )}

      {/* Search — Student touch #1 */}
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          className="search-bar"
          type="text"
          placeholder="Search events by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">🔎</div>
          <p>No events match "<strong>{search}</strong>"</p>
        </div>
      )}

      {filtered.map((event, i) => (
        <div
          key={event.id}
          className="card"
          onClick={() => navigate(`/events/${event.id}`)}
          style={{ animationDelay: `${i * 0.04}s`, animation: 'pageIn 0.4s ease both' }}
        >
          {/* Student touch #2: numbered chip */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 26, height: 26, borderRadius: 7,
            background: 'rgba(79,156,249,0.12)', color: 'var(--accent)',
            fontSize: 11, fontWeight: 700, marginBottom: 10
          }}>
            {event.id}
          </div>
          <h3>{event.title}</h3>
          <p>{event.body.slice(0, 90)}…</p>
          <span style={{
            display: 'inline-block', marginTop: 12,
            fontSize: 12, color: 'var(--accent)',
            fontWeight: 600, letterSpacing: '.3px'
          }}>
            View details →
          </span>
        </div>
      ))}
    </div>
  )
}

export default Events
