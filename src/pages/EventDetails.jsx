// pages/EventDetails.jsx
import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'

function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent]     = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        if (!res.ok) throw new Error('Event not found.')
        const data = await res.json()
        setEvent(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchEvent()
  }, [id])

  if (loading) return (
    <div className="loading">
      <div className="spinner" />
      Loading event details...
    </div>
  )
  if (error) return <div className="error">⚠️ {error}</div>

  return (
    <div className="page">
      <button className="btn-ghost" onClick={() => navigate('/events')} style={{ marginBottom: 28 }}>
        ← Back to Events
      </button>

      <div className="detail-header">
        <div className="detail-chip">📌 Event ID #{event.id}</div>
        <h2 className="detail-title">{event.title}</h2>
        <p className="detail-body">{event.body}</p>
      </div>

      <div className="card" style={{ cursor: 'default' }}>
        <h3 style={{ marginBottom: 10 }}>📋 Event Info</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ color: 'var(--muted)', fontSize: 13, width: 90 }}>Event ID</span>
            <span style={{ fontWeight: 600 }}>#{event.id}</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ color: 'var(--muted)', fontSize: 13, width: 90 }}>User ID</span>
            <span style={{ fontWeight: 600 }}>{event.userId}</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ color: 'var(--muted)', fontSize: 13, width: 90 }}>Status</span>
            <span className="badge badge-active" style={{ marginLeft: 0 }}>Active</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails
