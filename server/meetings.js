const express = require('express');
const meetingsRouter = express.Router();

const { createMeeting,
    getAllFromDatabase,
    addToDatabase,
    deleteAllFromDatabase
    } = require('./db.js');

meetingsRouter.get('/', (req, res, next) => {
    const allMeetings = getAllFromDatabase('meetings');
    res.status(200).send(allMeetings);
});

meetingsRouter.post('/', (req, res, next) => {
    const newMeeting = createMeeting();
    addToDatabase('meetings', newMeeting);
    res.status(201).send(newMeeting);
});

meetingsRouter.delete('/', (req, res, next) => {
    deleteAllFromDatabase('meetings');
    res.status(204).send();
})

module.exports = meetingsRouter;