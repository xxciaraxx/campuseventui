// context/AppContext.jsx
// This file handles two things:
// 1. Auth (login/logout)
// 2. Events (add, delete, toggle status) using useReducer

import { createContext, useContext, useReducer, useState } from 'react'

// ─── AUTH CONTEXT ───────────────────────────────────────────────
export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  function login() {
    setIsLoggedIn(true)
  }

  function logout() {
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}


// ─── EVENTS CONTEXT (useReducer) ────────────────────────────────
export const EventsContext = createContext()

// Initial sample events in the dashboard
const initialEvents = [
  { id: 1, title: 'Campus Fair 2026', status: 'active' },
  { id: 2, title: 'Tech Symposium', status: 'inactive' },
  { id: 3, title: 'Sports Festival', status: 'active' },
]

// Reducer handles all event actions
function eventsReducer(state, action) {
  switch (action.type) {

    case 'ADD_EVENT':
      return [...state, { id: Date.now(), title: action.title, status: 'active' }]

    case 'DELETE_EVENT':
      return state.filter(event => event.id !== action.id)

    case 'TOGGLE_STATUS':
      return state.map(event =>
        event.id === action.id
          ? { ...event, status: event.status === 'active' ? 'inactive' : 'active' }
          : event
      )

    default:
      return state
  }
}

export function EventsProvider({ children }) {
  const [events, dispatch] = useReducer(eventsReducer, initialEvents)

  function addEvent(title) {
    dispatch({ type: 'ADD_EVENT', title })
  }

  function deleteEvent(id) {
    dispatch({ type: 'DELETE_EVENT', id })
  }

  function toggleStatus(id) {
    dispatch({ type: 'TOGGLE_STATUS', id })
  }

  return (
    <EventsContext.Provider value={{ events, addEvent, deleteEvent, toggleStatus }}>
      {children}
    </EventsContext.Provider>
  )
}

export function useEvents() {
  return useContext(EventsContext)
}
