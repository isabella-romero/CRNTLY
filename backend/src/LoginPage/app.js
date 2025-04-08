const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const dbPath = path.join(__dirname, 'users.db');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Initialize database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) console.error(err);
    else console.log('Connected to SQLite database');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT
)`);

// Routes

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, user) => {
        if (err) return res.status(500).send("Server error");

        if (user) {
            res.redirect('/welcome');
        } else {
            res.redirect('/');
        }
    });
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { username, password } = req.body;

    db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
        if (err) return res.status(500).send("Server error");

        if (user) {
            res.redirect('/');
        } else {
            db.run("INSERT INTO users (username, password) VALUES (?, ?)", [username, password], function (err) {
                if (err) return res.status(500).send("Error inserting user");
                res.redirect('/welcome');
            });
        }
    });
});

app.get('/welcome', (req, res) => {
    res.send('<h1>Welcome!</h1>');
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
