const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const cors = require('cors') // Import cors middleware

const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.json())
app.use(cors()) // Use cors middleware

// Connect to SQLite database
const db = new sqlite3.Database('mydatabase.db', (err) => {
  if (err) {
    console.error(err.message)
  }
  console.log('Connected to the SQLite database.')
})

// Create users table in the database if it does not exist
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`)

// Middleware to generate token after successful login
function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, 'your_secret_key', { expiresIn: '1h' })
}

// User registration endpoint
app.post('/register', (req, res) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please provide name, email, and password' })
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }

    db.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err) => {
        if (err) {
          return res.status(500).json({ error: err.message })
        }
        return res.status(200).json({ message: 'User registered successfully' })
      },
    )
  })
})

// User login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body

  db.get('SELECT * FROM users WHERE email = ?', [username], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message })
    }
    if (!user) {
      return res.status(400).json({ message: 'User not found' })
    }

    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message })
      }
      if (!result) {
        return res.status(400).json({ message: 'Incorrect password' })
      }

      const token = generateToken(user)
      return res.status(200).json({ message: 'Login successful', token })
    })
  })
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
