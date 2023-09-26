import {
     POST_DRIVERS,
     GET_ALL_DRIVERS,
     GET_TEAMS,
     GET_BY_NAME,
     GET_BY_ID,
     GET_DETAIL,
     ORDER_BY_ASC,
     FILTER_BY_TEAM,
     FILTER_BY_CREATED
 } from './ActionsTypes'

 let initialState = { 
    allDrivers: [], 
    allTeams: [], 
    detail: [], 
    copyAllDrivers: [],
    name: []
};

const rootReducer = () => {};

export default rootReducer;