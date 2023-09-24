const { Driver, Teams } = require('../db');
const axios = require('axios');
const {create, getInfo, getByName, getById, getTeams} = require('./controllers');

const handlerCreate = async (req, res) => {};

const getHandlerInfo = async (req, res) => {
    try {
        const response = await getInfo();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

const getHandrlerTeam = async (req, res) => {};

const handlerName = async (req, res) => {
    const { name, lastName } = req.query;

    try {
        const response = await getByName(name, lastName);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

const handlerId = async (req, res) => {};

module.exports = { handlerCreate, getHandlerInfo, getHandrlerTeam, handlerName, handlerId }

