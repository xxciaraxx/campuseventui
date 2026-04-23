// pages/Home.jsx
function Home() {
  return (
    <div className="hero">
      <span className="hero-eyebrow">
        <span>✦</span> ISPSC — Prof Elective 3
      </span>

      <h1>Your Campus.<br />Your Events.</h1>

      <p>
        Discover, manage, and stay updated on everything
        happening around campus — all in one place.
      </p>

      <a href="/events">
        <button className="btn-primary" style={{ fontSize: '15px', padding: '13px 30px' }}>
          Browse Events →
        </button>
      </a>

      <div className="hero-grid" style={{ maxWidth: '820px', margin: '50px auto 0' }}>
        <div className="hero-feature">
          <div className="feat-icon">📅</div>
          <h3>Live Event Feed</h3>
          <p>Browse all campus events fetched in real-time from our API.</p>
        </div>
        <div className="hero-feature">
          <div className="feat-icon">📊</div>
          <h3>Event Dashboard</h3>
          <p>Add, remove, and toggle the status of events you manage.</p>
        </div>
        <div className="hero-feature">
          <div className="feat-icon">🔐</div>
          <h3>Secure Access</h3>
          <p>Protected routes ensure only logged-in users access the dashboard.</p>
        </div>
        <div className="hero-feature">
          <div className="feat-icon">⚡</div>
          <h3>Optimized Speed</h3>
          <p>Lazy loading and auto-refresh keep the app fast and up-to-date.</p>
        </div>
      </div>
    </div>
  )
}

export default Home
