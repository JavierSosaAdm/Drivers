const { Router } = require("express");
const { teamRouter } = require('./teamRouter');
const { driverRouter } = require('./driverRouter');

const router = Router();

router.use('/', driverRouter);
router.use('/', teamRouter);

module.exports = router;
