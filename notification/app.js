const express = require('express');
const mongoose = require('mongoose');
const cron = require('node-cron');
const { findNotificationsToSend } = require('./services');

const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mongo', { useNewUrlParser: true, useUnifiedTopology: true });
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error);
})

database.once('connected', () => {
    console.log('Database Connected');
    app.listen(3001, () => {
        console.log(`Notification Service Started at ${3001}`);
        cron.schedule('0 0 * * *', () => {
            findNotificationsToSend();
        });
    });
});