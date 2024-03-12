// Importa el módulo 'express', que es un framework web para Node.js
const express = require('express');

// Importa la biblioteca 'mongoose', que facilita la interacción con MongoDB
const mongoose = require('mongoose');

// Establece la conexión a la base de datos MongoDB con la URL de conexión proporcionada
mongoose.connect('mongodb+srv://manuelagiraldo1999:manu12345678@cluster0.dnlbckj.mongodb.net/');

// Obtiene la conexión a la base de datos
const db = mongoose.connection;

// Establece un manejador de eventos para el evento de error en la conexión a la base de datos
db.on('error', console.error.bind(console, 'conection error:'));

// Establece un manejador de eventos para el evento de apertura de la conexión a la base de datos
db.once('open', function () {
    console.log('conectado to MongoDB'); // Mensaje de éxito al establecer la conexión

    // Define el esquema de datos para los usuarios en la base de datos MongoDB
    const userSchema = mongoose.Schema({
        nombres: String,
        apellidos: String
    });

    // Crea un modelo de datos llamado 'User' basado en el esquema 'userSchema'
    const User = mongoose.model('users', userSchema);

    const companySchema = mongoose.Schema({
        nombre: String
    })

    
    const Company = mongoose.model('empresas', companySchema);

    // Crea una instancia de la aplicación Express
    const app = express();
    
    // Configura la aplicación Express para usar el middleware que analiza las solicitudes con formato JSON
    app.use(express.json());

    // Define una ruta para manejar las solicitudes GET a '/api/users'
    app.get('/api/users', async (req, res) => {
        // Busca todos los usuarios en la base de datos y los devuelve en formato JSON
        const users = await User.find();
        res.json(users);
    });

    app.get('/api/users/limit10', async (req, res)=> {
        const users10 = await User.find().limit(10);
        res.json(users10);
    });

    app.get('/api/empresas', async (req, res) => {
            const Companies = await Company.find();
            res.json(Companies);       
    });

    app.get('/api/users/empresas', async (req, res) => {
        const users5 = await User.find({empresa_id:5});
        res.json(users5);
    });

    app.get('/api/users/Bangladesh', async (req, res) => {
        const usersCountry = await User.find({ pais: "Bangladesh" });
        res.json(usersCountry);
    });

    app.get('/api/empresas/Bangladesh', async (req,res) => {
        const companiesCountry = await Company.find({ ciudad: "Bangladesh" });
        res.json(companiesCountry);
    });

    // Inicia el servidor en el puerto 3000 y muestra un mensaje en la consola
    app.listen(3000, function () {
        console.log('arribita 3000');
    });
});
