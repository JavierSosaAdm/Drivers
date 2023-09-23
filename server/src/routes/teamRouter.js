const { Router } = require('express');
const { getHandrlerTeam } = require('../Controllers/hadlers')

const teamRouter = Router()

teamRouter.get('/team', getHandrlerTeam)

module.exports = { teamRouter };