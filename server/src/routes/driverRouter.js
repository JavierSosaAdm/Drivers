const { Router } = require('express');
const { handlerCreate, getHandlerInfo, handlerName, handlerId } = require('../Controllers/hadlers')

const driverRouter = Router()

driverRouter.post('/driver', handlerCreate);
driverRouter.get('/driver', getHandlerInfo); //TERMINADO
driverRouter.get('/search', handlerName);
driverRouter.get('/driver/:id', handlerId);


module.exports = { driverRouter };