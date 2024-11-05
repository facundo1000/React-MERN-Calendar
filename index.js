const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');

const app = express();

//Base de datos
dbConnection();

//Cors
app.use(cors());

//Parseo y lectura del body
app.use(express.json());

//Directorio publico
app.use(express.static('public'));

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});