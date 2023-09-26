const { Router } = require('express');
const { getHandrlerTeam } = require('../Controllers/hadlers')

const teamRouter = Router()

teamRouter.get('/teams', getHandrlerTeam) // TERMINADO

module.exports = { teamRouter };