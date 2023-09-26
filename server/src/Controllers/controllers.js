const axios = require('axios');
const { Sequelize } = require('sequelize');
const { Driver, Teams } = require('../db');
require('dotenv').config();
const { API_URL } = process.env;
const Op = Sequelize.Op;

const create = async (name, lastName, description, image, nationality, birthdate, teams) => {
    const newDriver = await Driver.create({
        name,
        lastName,
        description,
        image,
        nationality,
        birthdate,
        created: true
    });

    if (teams && teams.length > 0) await newDriver.addTeams(teams);

    const finalResponse = {
        ...newDriver.get(),
        teams: teams? await Promise.all(teams.map((teamId) => Teams.findByPk(teamId))) : []};

        return finalResponse;
};

const getInfo = async () => {
    const response = (await axios.get(`${API_URL}/drivers`)).data;
    const driversAPI = response.map((driver) => {
        return {
            id: driver.id,
            name: driver.name.forename,
            lastName: driver.name.surname,
            description: driver.description,
            image: driver.image.url? driver.image.url : 'https://meragor.com/files/styles//ava_800_800_wm/lyudi-motokross-sport-11644.jpg',  
            nationality: driver.nationality,
            birthdate: driver.dob,
            teams: driver.teams
        }
    })
    const driversDB = await Driver.findAll();
    return [...driversDB, ...driversAPI]
};

const getByName= async (name) => {
    

    if (!name) return 'Debe escribir el nombre del Piloto';    
 
        const nameDB = await Driver.findAll({
            where: {
                name: {
                    [Op.iLike]: `${name}`
                }
            }
        });

        const response = (await axios.get(`${API_URL}/drivers?name.forename=${name}`)).data
        const namesAPI = [...response];
        const allDrivers = [...nameDB, ...namesAPI];
        if (allDrivers.length === 0) {
            return 'No se encuentran pilotos con ese nombre.'
        } else {
            return allDrivers.slice(0, 15).map((driver) => {
                return {
                    // incluir aquí lo que va dato por dato detallado
                    id: driver.id,
                    name: driver.name.forename,
                    lastName: driver.name.surname,
                    description: driver.description,
                    image: driver.image.url? driver.image.url : 'https://meragor.com/files/styles//ava_800_800_wm/lyudi-motokross-sport-11644.jpg',  
                    nationality: driver.nationality,
                    birthdate: driver.dob,
                    teams: driver.teams
                };
            })
        };
};


const getById = async (id) => {
    if (isNaN(id)) {
        const driverId = await Driver.findOne({
            where: {
                id: id,
            },
            include: [
                {
                    model: Teams,
                    as: 'team',
                    attributes: ['id', 'name'],
                    through: { attributes: [] }
                }
            ]
        })
        return driverId;
    } else {
        const driverDetail = (await axios.get(`${API_URL}/drivers/${id}`)).data;
        if (driverDetail) {
            return {
                id: driverDetail.id,
                name: driverDetail.name.forename, 
                lastName: driverDetail.name.surname,
                description: driverDetail.description,
                image: driverDetail.image.url? driverDetail.image.url : 'https://meragor.com/files/styles//ava_800_800_wm/lyudi-motokross-sport-11644.jpg',  
                nationality: driverDetail.nationality,
                birthdate: driverDetail.dob,
                teams: driverDetail.teams
            };
        };
    };
};

const getTeams= async () => {
    const data = await Teams.findOne()

    if (!data) {
        const teams = (await axios.get(`${API_URL}/drivers`)).data
        const teamsAPI = teams.map((team) => {
            return {
                name: team.teams? team.teams : 'piloto sin equipo',
            }
        });
        const teamsDB = await Teams.bulkCreate(teamsAPI)
        return [...teamsDB]
    } else {
        const dataComplete = await Teams.findAll();
        return dataComplete
    }
    
};
module.exports = {create, getInfo, getByName, getById, getTeams};
