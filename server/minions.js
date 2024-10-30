
const express = require('express');
const minionsRouter = express.Router();

const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
    } = require('./db.js');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minionId = id;
    const foundMinion = getFromDatabaseById('minions', minionId);
    if (foundMinion) {
        req.minionId = minionId;
        next();
    } else {
        res.status(404).send('Invalid minionId');
    }
});

// Routes

minionsRouter.get('/', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions');
    res.status(200).send(allMinions);
    next();
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.status(200).send(getFromDatabaseById('minions', req.minionId));
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
    deleteFromDatabasebyId('minions', req.minionId);
    res.status(204).send('minion dissolved');
});

const workRouter = require('./work.js');
minionsRouter.use('/:minionId/work', workRouter);

module.exports = minionsRouter;

