const checkMillionDollarIdea = (req, res, next) => {
    const weeklyRevenue = req.body.weeklyRevenue;
    const numWeeks = req.body.numWeeks;
    if (numWeeks * weeklyRevenue < 1000000 || (isNaN(weeklyRevenue) || isNaN(numWeeks))) {
        res.status(400).send('Idea needs to make more money');
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
