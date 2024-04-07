import React from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import useLogin from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom' // import useNavigate จาก react-router-dom

const Home = () => {
  const { logout } = useLogin()
  const navigate = useNavigate() // นำเข้า useNavigate
  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div>
        <h1>Welcome to Home</h1>
        <p>This is the home page content.</p>
      </div>
    </div>
  )
}

export default Home
