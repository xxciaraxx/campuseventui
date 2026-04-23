// components/Layout.jsx
// This wraps all pages — it shows the Navbar on top
// and renders the current page below using <Outlet />

import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default Layout
