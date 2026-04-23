// pages/Dashboard.jsx
import { useState } from 'react'
import { useEvents } from '../context/AppContext'

function Dashboard() {
  const { events, addEvent, deleteEvent, toggleStatus } = useEvents()
  const [newTitle, setNewTitle] = useState('')

  const activeCount   = events.filter(e => e.status === 'active').length
  const inactiveCount = events.filter(e => e.status === 'inactive').length

  function handleAdd() {
    if (!newTitle.trim()) return
    addEvent(newTitle.trim())
    setNewTitle('')
  }

  return (
    <div className="page">
      <h1 className="page-title">Dashboard</h1>
      <p className="page-sub">Manage your campus events — add, remove, or toggle status.</p>

      {/* Stat Pills */}
      <div className="stat-row">
        <div className="stat-pill">
          <div className="stat-num c-accent">{events.length}</div>
          <div className="stat-label">Total</div>
        </div>
        <div className="stat-pill">
          <div className="stat-num c-success">{activeCount}</div>
          <div className="stat-label">Active</div>
        </div>
        <div className="stat-pill">
          <div className="stat-num c-danger">{inactiveCount}</div>
          <div className="stat-label">Inactive</div>
        </div>
      </div>

      {/* Add Event */}
      <div className="add-form">
        <h3>➕ Add New Event</h3>
        <div className="add-row">
          <input
            type="text"
            placeholder="Enter event title..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
          />
          <button className="btn-primary" onClick={handleAdd}>Add</button>
        </div>
      </div>

      {/* Event List */}
      <h2 style={{
        fontFamily: "'Syne',sans-serif", fontSize: 17, fontWeight: 700,
        marginBottom: 14, color: 'var(--muted)', textTransform: 'uppercase',
        letterSpacing: '.6px'
      }}>
        Your Events
      </h2>

      {events.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No events yet. Add your first one above!</p>
        </div>
      )}

      {events.map(event => (
        <div key={event.id} className="event-row">
          <div className="row-title">
            {event.title}
            <span className={`badge badge-${event.status}`}>{event.status}</span>
          </div>
          <div className="row-actions">
            <button className="btn-success" onClick={() => toggleStatus(event.id)}>
              Toggle
            </button>
            <button className="btn-danger" onClick={() => deleteEvent(event.id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Dashboard
