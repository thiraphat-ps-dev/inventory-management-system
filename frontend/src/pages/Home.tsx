// src/pages/Home.tsx
import React from 'react'
import { Button } from '@mui/material'
import useLogin from '../hooks/useAuth'

const Home = () => {
  const { logout } = useLogin()

  const handleLogout = () => {
    logout()
  }

  return (
    <div>
      <h1>Welcome to Home</h1>
      <p>This is the home page content.</p>
      {/* เพิ่มปุ่ม logout */}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default Home
