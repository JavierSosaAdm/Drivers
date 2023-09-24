const axios = require('axios');
const { Sequelize } = require('sequelize');
const { Driver, Teams } = require('../db');
require('dotenv').config();
const { API_URL } = process.env;
const Op = Sequelize.Op;

const create = async () => {};

const getInfo = async () => {
    const response = (await axios.get(`${API_URL}/drivers`)).data;
    const driversAPI = response.map((driver) => {
        return {
            id: driver.id,
            name: driver.name.forename,
            lastName: driver.name.surname,
            description: driver.description,
            image: driver.image? driver.image.url : 'https://meragor.com/files/styles//ava_800_800_wm/lyudi-motokross-sport-11644.jpg',  
            nationality: driver.nationality,
            birthdate: driver.dob,
            teams: driver.teams
        }
    })
    const driversDB = await Driver.findAll();
    return [...driversDB, ...driversAPI]
};

const getByName= async (name) => {
    if (!name) {
        return 'Debe escribir un nombre válido';    
    }
    const nameDB = await Driver.findAll({
        where: {
            name: {
                [Op.iLike]: `${name}`
            }
        }
    });

    const response = await axios.get(`${API_URL}/drivers?name.surname=${name}`);
    const namesAPI = response.data

    const allDrivers = [...nameDB, ...namesAPI];

    if (allDrivers.length === 0) {
        return 'No se encuentran pilotos con ese nombre.'
    } else {
        return allDrivers.slice(0, 15).map((driver) => {
            return {
                // incluir aquí lo que va dato por dato detallado

            }
        })
    }

};

const getById = async () => {};

const getTeams= async () => {};

module.exports = {create, getInfo, getByName, getById, getTeams};
