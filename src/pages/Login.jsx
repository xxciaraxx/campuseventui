// pages/Login.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AppContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { login, isLoggedIn } = useAuth()
  const navigate = useNavigate()

  if (isLoggedIn) {
    return (
      <div className="login-wrap">
        <div className="login-card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 44, marginBottom: 14 }}>✅</div>
          <h2 style={{ fontFamily: "'Syne',sans-serif", marginBottom: 8 }}>You're logged in!</h2>
          <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: 14 }}>
            Head over to your dashboard.
          </p>
          <button className="btn-primary" style={{ width: '100%', padding: '13px' }}
            onClick={() => navigate('/dashboard')}>
            Go to Dashboard →
          </button>
        </div>
      </div>
    )
  }

  function handleLogin() {
    if (username === 'admin' && password === '1234') {
      login()
      navigate('/dashboard')
    } else {
      setErrorMsg('Wrong credentials. Try: admin / 1234')
    }
  }

  return (
    <div className="login-wrap">
      <div className="login-card">
        <div className="login-logo">
          🎓 CampusEventUI
        </div>
        <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 24 }}>
          Sign in to access your dashboard
        </p>

        <div className="login-hint">
          💡 Demo credentials: <strong style={{ color: 'var(--text)' }}>admin</strong> / <strong style={{ color: 'var(--text)' }}>1234</strong>
        </div>

        {errorMsg && <div className="login-error">⚠️ {errorMsg}</div>}

        <label>Username</label>
        <input
          type="text"
          placeholder="admin"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
        />

        <button className="btn-primary"
          onClick={handleLogin}
          style={{ width: '100%', padding: '14px', fontSize: 15, marginTop: 4 }}>
          Sign In →
        </button>
      </div>
    </div>
  )
}

export default Login
