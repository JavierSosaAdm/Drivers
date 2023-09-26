const { Router } = require('express');
const { handlerCreate, getHandlerInfo, handlerName, handlerId } = require('../Controllers/hadlers')

const driverRouter = Router()

driverRouter.post('/drivers', handlerCreate); // CASI TERMINADO
driverRouter.get('/drivers', getHandlerInfo); //TERMINADO
driverRouter.get('/search', handlerName); // falta apellidos y el toLowerCase();
driverRouter.get('/drivers/:id', handlerId); // TERMINADO


module.exports = { driverRouter };