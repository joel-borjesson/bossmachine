const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
    } = require('./db.js');

// Id validation
ideasRouter.use('/:ideaId', (req, res, next) => {
    const foundIdea = getFromDatabaseById('ideas', req.params.ideaId);
    if (foundIdea) {
        req.body.id = req.params.ideaId;
        next();
    } else {
        res.status(404).send('Invalid ideaId');
    }
});

// routes
ideasRouter.get('/', (req, res, next) => {
    const allIdeas = getAllFromDatabase('ideas');
    res.status(200).send(allIdeas);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(getFromDatabaseById('ideas', req.params.ideaId));
});

ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
    const newIdea = addToDatabase('ideas', {
        name: req.body.name,
        description: req.body.description,
        numWeeks: req.body.numWeeks,
        weeklyRevenue: req.body.weeklyRevenue
    });
    res.status(201).send(newIdea);
});

ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res, next) => {
    updateInstanceInDatabase('ideas', req.body);
    res.status(201).send(req.body);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    deleteFromDatabasebyId('ideas', req.body.id);
    res.status(204).send();
})

module.exports = ideasRouter;