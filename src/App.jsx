import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

import { AuthProvider, EventsProvider } from './context/AppContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'

// Regular imports (loaded immediately)
import Home from './pages/Home'
import Login from './pages/Login'

// Lazy imports (loaded only when needed — Step 11)
const Events = lazy(() => import('./pages/Events'))
const EventDetails = lazy(() => import('./pages/EventDetails'))
const Dashboard = lazy(() => import('./pages/Dashboard'))

function App() {
  return (

    <AuthProvider>
      <EventsProvider>
        <BrowserRouter>

          {}
          <Suspense fallback={<div className="loading">Loading page...</div>}>
            <Routes>

              {}
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="events" element={<Events />} />
                <Route path="events/:id" element={<EventDetails />} />
                <Route path="login" element={<Login />} />

                {}
                <Route
                  path="dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
              </Route>

            </Routes>
          </Suspense>

        </BrowserRouter>
      </EventsProvider>
    </AuthProvider>
  )
}

export default App
