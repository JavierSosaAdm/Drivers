const { Driver, Teams } = require('../db');
const axios = require('axios');
const {create, getInfo, getByName, getById, getTeams} = require('./controllers');

const handlerCreate = async (req, res) => {
    const { name, lastName, description, image, nationality, birthdate, teams } = req.body;
    try {
        const response = await create(name, lastName, description, image, nationality, birthdate, teams);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const getHandlerInfo = async (req, res) => {
    try {
        const response = await getInfo();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

const getHandrlerTeam = async (req, res) => {
    try {
        const response = await getTeams();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message})
    }
};

const handlerName = async (req, res) => {
    const { name } = req.query;

    try {
        const response = await getByName(name);
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

const handlerId = async (req, res) => {
    const {id} = req.params
    try {
        response = await getById(id)
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message});
    }
};

module.exports = { handlerCreate, getHandlerInfo, getHandrlerTeam, handlerName, handlerId }

