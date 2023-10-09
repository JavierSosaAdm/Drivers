const axios = require('axios');
const { Op, Sequelize } = require('sequelize');
const { Driver, Teams } = require('../db');
// require('dotenv').config();
// const { API_URL } = process.env;
// const Op = Sequelize.Op;
const API_URL = 'http://localhost:5000'


const create = async (name, lastName, description, image, nationality, birthdate, teams) => {
    
    try {
        const newDriver = await Driver.create({
            name,
            lastName,
            description,
            image,
            nationality,
            birthdate,
            created: true
        });
    
        if (teams && teams.length > 0) {
            await Promise.all(teams.map(async (teamId) => {
                const team = await Teams.findByPk(teamId);
                if (team) {
                    await newDriver.addTeam(team);
                }
            }))
        } 
        
        const finalResponse = {
            ...newDriver.get(),
            teams: teams ? await Promise.all(teams.map((teamId) => Teams.findByPk(teamId))) : [] 
        };
    
        return finalResponse;
    } catch (error) {
        console.error("Error en la creación del conductor:", error);
        throw error;
    }
   
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
    const driversDB = await Driver.findAll({
        include: [
            {
                model: Teams,
                as: 'team',
                attributes: ['name'],
                through: { attributes: [] }
            }
        ]
    });
    
    return [...driversDB, ...driversAPI]
};


const getByName= async (name) => {
    // if (typeof name === 'string') 
    //     const nameLower = name.toLowerCase();
    //     const name = nameLower.charAt(0).toUpperCase() + nameLower.slice(1)
        
    
    const driverDB = await Driver.findAll({
        where: {
            name: {
                [Op.iLike]: `${name}`
            }
        }
    });

    const response = (await axios.get(`${API_URL}/drivers`)).data
    const filterName = response.filter((driver) => {
        return driver.name.forename.includes(name)
    })
    const driverAPI = filterName.map((driver) =>{
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

    const result = [...driverDB, ...driverAPI]

    return result
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

// const getTeams= async () => {
    //     const dataTeams = await Teams.findAll()
    //     const cleanTeams = new Set(); 
    
    //     if (dataTeams.length === 0) {
        //         const allDrivers = [];
        //         const teams = (await axios.get(`${API_URL}/drivers`)).data
        //         teams.map((driver) => allDrivers.push(driver.teams));
        
        //         teams.forEach((driver) => {
            //             if(driver.teams) {
                //                 const teamsArr = driver.teams.split(',').map((elem) => elem.trim());
                //                 teamsArr.forEach((teamName) => {
                    //                     cleanTeams.add(teamName)  
                    //                 });
                    //             } 
                    //         })
                    //     }
                    //     const teamsOK = Array.from(cleanTeams).map((nombre) => ({
                        //         teamName: nombre
                        //     }));
                        //     await Teams.bulkCreate(teamsOK);
                        //     return dataTeams;
                        // ----------------------------------------------------------------

// const nameDB = await Driver.findAll({
    //     where: {
        //         name: {
            //             [Op.iLike]: `${name}`
            //         }
            //     }
            // });
            
            
            // const lastNameDB = await Driver.findAll({
                //     where: {
                    //         lastName: {
                        //             [Op.iLike]: `${name}`
                        //         }
                        //     }
                        // });
                        
                        // const allNamesDB = [...nameDB, ...lastNameDB]
                        
                        // if (allNamesDB.length !== 0) return allNamesDB.map((driver) => {
                            //     return {
                                //         id: driver.id,
                                //         name: driver.name,
                                //         lastName: driver.lastName,
                                //         description: driver.description,
                                //         image: driver.image,  
                                //         nationality: driver.nationality,
                                //         birthdate: driver.birthdate,
                                //         teams: driver.teams
                                //     }
                                // })
                                
                                //     const response1 = (await axios.get(`${API_URL}/drivers?name.forename=${name}`)).data
                                //     const response2 = (await axios.get(`${API_URL}/drivers?name.surname=${name}`)).data
                                //     const namesAPI = [...response1, ...response2].map((driver) => {
                                    //         return {
                                        //             id: driver.id,
                                        //             name: driver.name?.forename,
                                        //             lastName: driver.name?.surname,
                                        //             description: driver.description,
                                        //             image: driver.image.url? driver.image.url : 'https://meragor.com/files/styles//ava_800_800_wm/lyudi-motokross-sport-11644.jpg',  
                                        //             nationality: driver.nationality,
                                        //             birthdate: driver.dob,
                                        //             teams: driver.teams
                                        //         };
                                        //     });
                                        //     const allDrivers = [...allNamesDB, ...namesAPI];
                                        
                                        //     if (allDrivers.length === 0) {
                                            //         return 'No se encuentran pilotos con ese nombre.'
                                            //     } else {
    //         return allDrivers.slice(0, 15);
    //     };
    //-------------------------------------------------------------------
//              getByName
        // if (!name) {
        //     return 'escribi algo'
        // };
        
        // const namesDB = await Driver.findAll({
        //     where: {
        //         name: {
        //             [Op.iLike]: `${name}`
        //         }
        //     }
        // });
        
        // const response = await axios.get(`${API_URL}/drivers?name.forename=${name}`)
        // const namesAPI = response
        // const allDrivers = [...namesDB, ...namesAPI];
        // if (allDrivers.length === 0) {
        //     return 'no hay drivers'
        // } else {
        //     return allDrivers.slice(0, 15).map((driver) => {
        //         return {
        //             id: driver.id,
        //             name: driver.name?.forename,
        //             lastName: driver.name?.surname,
        //             description: driver.description,
        //             image: driver.image.url? driver.image.url : 'https://meragor.com/files/styles//ava_800_800_wm/lyudi-motokross-sport-11644.jpg',
        //             nationality: driver.nationality,
        //             birthdate: driver.dob,
        //             teams: driver.teams
        //         }
        //     })
        // }