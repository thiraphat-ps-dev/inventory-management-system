import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import useAuth from './hooks/useAuth'
import Cookies from 'js-cookie' // import ไลบรารี js-cookie
import Navbar from './components/Navbar'

function App() {
  const { isLoggedIn } = useAuth()
  const [open, setOpen] = useState(false)

  const accessToken = Cookies.get('accessToken')

  useEffect(() => {
    // เช็คสถานะการเข้าสู่ระบบทุกครั้งที่มีการเปลี่ยนแปลงในตัวแปร isLoggedIn
    if (isLoggedIn) {
      setOpen(true)
    }
  }, [isLoggedIn])

  const handleOnClose = () => {
    setOpen(false)
  }

  return (
    <Router>
      <div className="App">
        {accessToken && <Navbar />}
        <Routes>
          {/* เพิ่มเงื่อนไขการเข้าถึงหน้า Home */}
          <Route path="/login" element={accessToken ? <Navigate to="/" /> : <Login />} />
          <Route
            path="/"
            element={
              accessToken ? (
                <Home />
              ) : (
                // ถ้าไม่ได้เข้าสู่ระบบให้เด้งไปยังหน้า Login
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={5000}
          onClose={handleOnClose}
        >
          <Alert onClose={handleOnClose} severity="success">
            Login Success
          </Alert>
        </Snackbar>
      </div>
    </Router>
  )
}

export default App
