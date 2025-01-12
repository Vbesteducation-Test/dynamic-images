const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // change to your MySQL username
    password: 'NiceDay', // change to your MySQL password
    database: 'school_data'
});

// Test Database Connection
db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        return;
    }
    console.log('Connected to the database.');
});

// Get Classes
app.get('/classes', (req, res) => {
    db.query('SELECT * FROM Classes', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get Subjects for a Class
app.get('/subjects/:classId', (req, res) => {
    const classId = req.params.classId;
    db.query('SELECT * FROM Subjects WHERE class_id = ?', [classId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get Chapters for a Subject
app.get('/chapters/:subjectId', (req, res) => {
    const subjectId = req.params.subjectId;
    db.query('SELECT * FROM Chapters WHERE subject_id = ?', [subjectId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Get Images for a Chapter
app.get('/images/:chapterId', (req, res) => {
    const chapterId = req.params.chapterId;
    db.query('SELECT * FROM Images WHERE chapter_id = ?', [chapterId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

// Like an Image
app.post('/like-image', (req, res) => {
    const { imageId } = req.body;
    db.query('UPDATE Images SET likes = likes + 1 WHERE image_id = ?', [imageId], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Image liked successfully!' });
    });
});

// Server Start
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
