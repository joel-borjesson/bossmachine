const workRouter = require('express').Router({mergeParams: true});

const { getAllFromDatabase,
    getFromDatabaseById,
    addToDatabase,
    updateInstanceInDatabase,
    deleteFromDatabasebyId
    } = require('./db.js');

workRouter.get('/', (req, res, next) => {
    const allWork = getAllFromDatabase('work');
    const minionWork = allWork.filter((obj) => obj.minionId === req.minionId);
    res.status(200).send(minionWork);
});

workRouter.post('/', (req, res, next) => {
    const newWork = addToDatabase('work', {
        title: req.body.title,
        description: req.body.description,
        hours: req.body.hours,
        minionId: req.minionId
    });
    res.status(201).send(newWork);
});

workRouter.put('/:workId', (req, res, next) => {
    if (req.body.minionId === req.minionId) {
        updateInstanceInDatabase('work', req.body);
        res.status(201).send(req.body);
    } else {
        res.status(400).send('wrong minion');
    }
    //req.body.minionId = req.minionId;
    //console.log(req.body);
});

workRouter.delete('/:workId', (req, res, next) => {
    req.body.minionId = req.minionId;
    deleteFromDatabasebyId('work', req.params.workId);
    res.status(204).send('work deleted');
});

module.exports = workRouter;