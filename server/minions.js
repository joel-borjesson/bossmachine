const express = require('express');
const minionsRouter = express.Router();

const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
    } = require('./db.js');

// Existence checking
minionsRouter.use('/:minionId', (req, res, next) => {
    const foundMinion = getFromDatabaseById('minions', req.params.minionId);
    if (foundMinion) {
        req.body.id = req.params.minionId;
        next();
    } else {
        res.status(404).send('Invalid minionId');
    }
});

// Routes

minionsRouter.get('/', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    res.status(200).send(allMinions);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(getFromDatabaseById('minions', req.params.minionId));
});

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', {
        name: req.body.name,
        title: req.body.title,
        salary: req.body.salary,
        weaknesses: req.body.weaknesses
        });
    res.status(201).send(newMinion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    updateInstanceInDatabase('minions', req.body);
    res.send(req.body);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    deleteFromDatabasebyId('minions', req.params.minionId);
    res.status(204).send('minion dissolved');
});

// work routes

minionsRouter.get('/:minionId/work', (req, res, next) => {
    res.send(getAllFromDatabase('work', req.params.minionId));
});

minionsRouter.post('/:minionId/work', (req, res, next) => {
    const newWork = addToDatabase('work', {
        title: req.body.title,
        description: req.body.description,
        hours: req.body.hours,
        minionId: req.params.minionId
    });
    res.status(201).send(newWork);
});

minionsRouter.put('/:minionId/work/:workId', (req, res, next) => {
    console.log(req.params);
    console.log('test');
    updateInstanceInDatabase('work', req.params.workId);
    res.status(204).send(req.body);
})

module.exports = minionsRouter;

