const express = require('express');
const apiRouter = express.Router({mergeParams: true});

// minions routes
const minionsRouter = require('./minions.js');
apiRouter.use('/minions', minionsRouter);

// ideas routes
const ideasRouter = require('./ideas.js');
apiRouter.use('/ideas', ideasRouter);

// meetings routes
const meetingsRouter = require('./meetings.js');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
