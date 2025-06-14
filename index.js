const express = require('express');
const mysql = require('mysql2');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// DB connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Routes
app.post('/submit', (req, res) => {
  const { name, score } = req.body;
  const sql = 'INSERT INTO quiz_results (name, score) VALUES (?, ?)';
  db.query(sql, [name, score], (err, result) => {
    if (err) return res.status(500).send('Error saving result');
    res.send('Result saved');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
