// components/ProtectedRoute.jsx
// If the user is NOT logged in, redirect them to /login
// If they ARE logged in, show the page normally

import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AppContext'

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth()

  if (!isLoggedIn) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute
