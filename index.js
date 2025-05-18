const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mm80997',
    database: 'crud_db'
});

db.connect(err => {
    if (err) {
        console.error('Error al conectar con MySQL:', err);
        return;
    }
    console.log('Conexión exitosa a MySQL');
});

// Rutas CRUD
app.get('/api/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

app.post('/api/items', (req, res) => {
    const { id, name } = req.body;
    db.query('INSERT INTO items (id, name) VALUES (?, ?)', [id, name], err => {
        if (err) return res.status(500).send(err);
        res.status(201).json({ id, name });
    });
});

app.put('/api/items/:id', (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    db.query('UPDATE items SET name = ? WHERE id = ?', [name, id], err => {
        if (err) return res.status(500).send(err);
        res.json({ id, name });
    });
});

app.delete('/api/items/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM items WHERE id = ?', [id], err => {
        if (err) return res.status(500).send(err);
        res.status(204).send();
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
