const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN);
        console.log('Database connected');
    } catch (error) {
        console.log('Database connection failed');
        console.log(error);
        throw new Error('Database connection failed');
    }
};

module.exports = {
    dbConnection
};