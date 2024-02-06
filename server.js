const express = require('express');
const mariadb = require('mariadb');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Create a connection pool
const pool = mariadb.createPool({
    host: '192.168.1.2',
    user: 'root',
    password: '',
    database: 'inventory_management',
    connectionLimit: 5
});

// Get all data
app.get('/api/data', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM user');
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.end();
    }
});

// Get data by ID
app.get('/api/data/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query('SELECT * FROM your_table WHERE id = ?', [req.params.id]);
        res.json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.end();
    }
});

// Create data
app.post('/api/data', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const result = await conn.query('INSERT INTO your_table (column1, column2) VALUES (?, ?)', [req.body.column1, req.body.column2]);
        res.json({ message: 'Data created successfully', id: result.insertId });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.end();
    }
});

// Update data
app.put('/api/data/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('UPDATE your_table SET column1 = ?, column2 = ? WHERE id = ?', [req.body.column1, req.body.column2, req.params.id]);
        res.json({ message: 'Data updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.end();
    }
});

// Delete data
app.delete('/api/data/:id', async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.query('DELETE FROM your_table WHERE id = ?', [req.params.id]);
        res.json({ message: 'Data deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (conn) conn.end();
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
