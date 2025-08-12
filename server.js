// server.js
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();

// Configuración de conexión a PostgreSQL
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'dbsigcap',
  password: '1234',
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Ruta de Login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = 'SELECT * FROM usuarios WHERE nombre_usuario = $1 AND contraseña = $2';
    const { rows } = await pool.query(query, [username, password]);
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res.status(401).json({ success: false, message: 'Credenciales inválidas' });
    }
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});

// Ruta de Registro
app.post('/api/register', async (req, res) => {
  const { username, email, password, rol } = req.body;
  try {
    // Validar si el usuario ya existe
    const checkUser = await pool.query('SELECT * FROM Usuarios WHERE nombre_usuario = $1 OR correo = $2', [username, email]);
    if (checkUser.rows.length > 0) {
      return res.status(400).json({ success: false, message: 'Usuario o correo ya existe' });
    }

    // Insertar nuevo usuario
    const insertQuery = 'INSERT INTO Usuarios (nombre_usuario, correo, contraseña, rol) VALUES ($1, $2, $3, $4) RETURNING *';
    const { rows } = await pool.query(insertQuery, [username, email, password, rol]);
    
    res.status(201).json({ success: true, user: rows[0] });
  } catch (err) {
    console.error('Error en registro:', err);
    res.status(500).json({ success: false, message: 'Error en el servidor' });
  }
});
// Configuración del puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en puerto ${PORT}`);

});
