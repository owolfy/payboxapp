const todosModel = require('../models/todos.model');

function sendNotification(notifications) {
    console.log('Notifications sent', notifications);
}

async function findNotificationsToSend() {
    try {
        const today = new Date();
        const dayAfterTomorrowNumber = new Date().setDate(today.getDate() + 2);
        const dayAfterTomorrow = new Date(dayAfterTomorrowNumber);
        const query = { deadline: { $lt: dayAfterTomorrow, $gt: today }, isCompleted: false }
        const results = await todosModel.find(query).lean();

        if (results.length === 0) {
            console.log('No notifications to send');
            return;
        }

        const groupByEmail = results.reduce((acc, todo) => {            
            if (!acc[todo.email]) {
                acc[todo.email] = [];
            }

            acc[todo.email].push({ deadline: todo.deadline, task: todo.task });
            return acc;
        }, {});

        sendNotification(groupByEmail)
    } catch (error) {
        console.log('findNotificationsToSend error:', error);
    }
}

module.exports = { findNotificationsToSend };