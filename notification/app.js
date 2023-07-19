const mongoose = require('mongoose');
const cron = require('node-cron');
const { findNotificationsToSend } = require('./services');

cron.schedule('0 0 * * *', () => {
	console.log('Running Cron Job');
	mongoose
		.connect('mongodb://localhost:27017/mongo', {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then((database) => {
			console.log('Connected to database');
			findNotificationsToSend().then(() => {
				console.log('Going back to sleep');
				database.disconnect();
			});
		});
});
